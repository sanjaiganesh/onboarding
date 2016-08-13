# WINK Hub translator

### This translator adopts the new design (https://github.com/openT2T/opent2t/pull/2)

## Build & Setup
Create  test javascript file(s) under 'tests' sub directory.

* Modify testconfig.json to populate <access-token>. It is added to .gitignore.
* global install ava test runner.
    npm install --global ava
* clone https://github.com/openT2T/opent2t (in say '*c:\projects\opent2t\opent2t*')
* npm install <clone directory of https://github.com/openT2T/opent2t) ('*required until the library is published *')
* npm install <..\..\org.OpenT2T.Onboarding.Hub>


## Running tests
* To run non-reflection style tests
    run '*node tests/tests.js*'    
* To run reflection style tests (which use '*ava*' test framework)
    1. Create testconfig.jsonwith with the following content (& access token info populated), in 'tests' directory
        {
            "accessToken": "*access-token-for-wink*" 
        }
    2. Run the tests
        run '*npm test*' or just '*ava*'
        * To run specific reflection style test
            run 'ava <test file path>'

