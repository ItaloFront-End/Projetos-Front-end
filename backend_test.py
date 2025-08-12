import requests
import sys
import json
from datetime import datetime

class ItaloDev_API_Tester:
    def __init__(self, base_url="https://italodev-webdesign.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            print(f"   Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_create_status_check(self):
        """Test creating a status check"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )
        
        if success and 'id' in response:
            print(f"   Created status check with ID: {response['id']}")
            return response['id']
        return None

    def test_get_status_checks(self):
        """Test getting all status checks"""
        success, response = self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} status checks")
        
        return success

    def test_create_contact_message(self):
        """Test creating a contact message"""
        test_data = {
            "name": "João Silva",
            "email": "joao@teste.com",
            "phone": "(11) 99999-9999",
            "message": "Gostaria de solicitar um orçamento para criação de um site institucional para minha empresa."
        }
        
        success, response = self.run_test(
            "Create Contact Message",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success and 'id' in response:
            print(f"   Created contact message with ID: {response['id']}")
            return response['id']
        return None

    def test_get_contact_messages(self):
        """Test getting all contact messages"""
        success, response = self.run_test(
            "Get Contact Messages",
            "GET",
            "contact",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} contact messages")
        
        return success

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        # Test missing required fields
        invalid_data = {
            "name": "",
            "email": "invalid-email",
            "message": ""
        }
        
        success, response = self.run_test(
            "Contact Form Validation (Invalid Data)",
            "POST",
            "contact",
            422,  # Expecting validation error
            data=invalid_data
        )
        
        return success

def main():
    print("🚀 Starting ItaloDev API Tests")
    print("=" * 50)
    
    # Setup
    tester = ItaloDev_API_Tester()
    
    # Test 1: Root endpoint
    print("\n📋 Testing Basic Connectivity...")
    root_success, _ = tester.test_root_endpoint()
    
    if not root_success:
        print("\n❌ Backend is not responding. Stopping tests.")
        print(f"\n📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
        return 1
    
    # Test 2: Status endpoints
    print("\n📋 Testing Status Check Endpoints...")
    status_id = tester.test_create_status_check()
    tester.test_get_status_checks()
    
    # Test 3: Contact endpoints
    print("\n📋 Testing Contact Form Endpoints...")
    contact_id = tester.test_create_contact_message()
    tester.test_get_contact_messages()
    
    # Test 4: Validation
    print("\n📋 Testing Form Validation...")
    tester.test_contact_form_validation()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! Backend is working correctly.")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed.")
        return 1

if __name__ == "__main__":
    sys.exit(main())