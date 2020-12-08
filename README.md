# Group 2 | Mock Project 2

Mock Project 2

1. Create a new site preference 
  - AcceptDonation (of type Boolean)
  - DollarThreshold (of Type integer)
  and group these attributes in a new site prefrence group
2. Set this site preference values
3. Create a new product called donationProduct and set the price as $1. This product should be online but not searchable
4. If the ordertotal is more than $X and site preference is true, then show a message in Cart page - Donate $1
5. The message seen in cart page must come from a content asset
6. If customers press this button in cart page, automatically add the newly created product to the cart
7. For every successful order placed with donationProduct, update an existing custom object with the donation amount.
8. Acceptance Criterea:

 - The message should only appear when site preference value of dollarThreshold and AcceptDonation are set and enabled

 - Once the donation product is added to cart the message should not be seen

 - If the donation product is removed from cart then the message should be seen again

 - Message seen in cart page must come from a content asset

 - Only one custom object will be created to maintain the donation amount. The ID of the custom object can be read from a site preference
 


# Getting Started

1. Clone this repository.

2. Run `npm install` to install all of the local dependencies (node version 8.x or current LTS release recommended)

3. Run `npm run compile:js` from the command line that would compile all client-side JS files. Run `npm run compile:scss` and `npm run compile:fonts` that would do the same for css and fonts.

4. Create `dw.json` file in the root of the project:
```json
{
    "hostname": "your-sandbox-hostname.demandware.net",
    "username": "yourlogin",
    "password": "yourpwd",
    "code-version": "version_to_upload_to"
}
```
5. Please update `path.base` section package.json accordingly.

6. Run `npm run uploadCartridge`. It will upload `app_storefront_base`, `modules` and `bm_app_storefront_base` cartridges to the sandbox you specified in `dw.json` file.

7. Use https://github.com/abhisheknarula25/group2 to zip and import site data on your sandbox.

8. Add the `app_donation` cartridge to your cartridge path in _Administration >  Sites >  Manage Sites > RefArch - Settings_ (Note: This should already be populated by the sample data in Step 6).

9. You should now be ready to navigate to and use your site.

# NPM scripts
Use the provided NPM scripts to compile and upload changes to your Sandbox.

## Compiling your application

* `npm run compile:scss` - Compiles all .scss files into CSS.
* `npm run compile:js` - Compiles all .js files and aggregates them.
* `npm run compile:fonts` - Copies all needed font files. Usually, this only has to be run once.

 If you are having an issue compiling scss files, try running 'npm rebuild node-sass' from within your local repo.
