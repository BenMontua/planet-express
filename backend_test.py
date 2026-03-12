import requests
import sys
from datetime import datetime
import json

class ContactFormAPITester:
    def __init__(self, base_url="https://transfer-pro-7.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                print(f"Response: {json.dumps(response_data, indent=2)}")
                result = {"status": "PASSED", "response": response_data}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {json.dumps(response_data, indent=2)}")
                result = {"status": "FAILED", "expected": expected_status, "actual": response.status_code, "response": response_data}

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "result": result
            })

            return success, response_data

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Timeout after 30 seconds")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "result": {"status": "TIMEOUT", "error": "Request timed out"}
            })
            return False, {"error": "timeout"}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "result": {"status": "ERROR", "error": str(e)}
            })
            return False, {"error": str(e)}

    def test_health_check(self):
        """Test basic API health"""
        return self.run_test("API Health Check", "GET", "", 200)

    def test_contact_form_submission(self):
        """Test contact form submission with valid data"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message for contact form validation."
        }
        
        success, response = self.run_test(
            "Contact Form Submission", 
            "POST", 
            "contact", 
            200, 
            data=test_data
        )
        
        if success:
            # Validate response structure
            if isinstance(response, dict) and 'success' in response and 'message' in response:
                print("✅ Response has correct structure")
                if response.get('success'):
                    print("✅ Contact form reported success")
                else:
                    print("⚠️ Contact form reported failure but returned 200")
            else:
                print("❌ Response missing required fields (success, message)")
                
        return success, response

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        test_cases = [
            {
                "name": "Empty Name",
                "data": {"name": "", "email": "test@example.com", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Invalid Email",
                "data": {"name": "Test User", "email": "invalid-email", "message": "Test message"},
                "expected_status": 422
            },
            {
                "name": "Empty Message",
                "data": {"name": "Test User", "email": "test@example.com", "message": ""},
                "expected_status": 422
            },
            {
                "name": "Missing Fields",
                "data": {"name": "Test User"},
                "expected_status": 422
            }
        ]
        
        validation_results = []
        for test_case in test_cases:
            print(f"\n--- Testing Validation: {test_case['name']} ---")
            success, response = self.run_test(
                f"Validation - {test_case['name']}", 
                "POST", 
                "contact", 
                test_case['expected_status'], 
                data=test_case['data']
            )
            validation_results.append(success)
            
        return all(validation_results)

    def test_status_endpoints(self):
        """Test existing status endpoints"""
        # Test GET status
        success1, _ = self.run_test("Get Status Checks", "GET", "status", 200)
        
        # Test POST status 
        test_status_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        success2, response = self.run_test("Create Status Check", "POST", "status", 200, data=test_status_data)
        
        return success1 and success2

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*50}")
        print(f"📊 TEST SUMMARY")
        print(f"{'='*50}")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%" if self.tests_run > 0 else "No tests run")
        
        print(f"\n📋 DETAILED RESULTS:")
        for test in self.test_results:
            status_emoji = "✅" if test['result']['status'] == "PASSED" else "❌"
            print(f"{status_emoji} {test['name']} ({test['method']} /{test['endpoint']})")
            
        return self.tests_passed == self.tests_run

def main():
    print("🚀 Starting Contact Form API Testing")
    print(f"Backend URL: https://transfer-pro-7.preview.emergentagent.com")
    
    tester = ContactFormAPITester()
    
    # Run all tests
    print("\n" + "="*60)
    print("1. Testing API Health Check")
    tester.test_health_check()
    
    print("\n" + "="*60)
    print("2. Testing Contact Form Submission")
    tester.test_contact_form_submission()
    
    print("\n" + "="*60)
    print("3. Testing Contact Form Validation")
    tester.test_contact_form_validation()
    
    print("\n" + "="*60)
    print("4. Testing Status Endpoints")
    tester.test_status_endpoints()
    
    # Print final summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())