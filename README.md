Forte Academy
==========

### Pre-Setup

First, clone the repo in a folder of your choice.
    
    git clone git@github.com:calblueprint/forte.git

Make sure you have the right Ruby version running (2.2.5). Use rvm to download or update if necessary. Run `gem install bundler` if you don't have bundler. Run command:

    bundle install

Install all the npm packages as well:

    npm install
    
### Setup

**First**, copy over the `application.yml` file from `config/samples/application.yml` to `config/application.yml`:

    cp config/samples/application.yml config/application.yml

Configure `config/application.yml` with the appropriate secret keys. You can generate a secret key with the command:

    rake secret

**Second**, copy over the `database.yml` file from `config/sample/database.yml` to `config/database.yml`:

    cp config/samples/database.yml config/database.yml

Configure `config/database.yml` with the appropriate database names (remove `sample_` from the names at the very least).

**Third**, start the postgres server (Run `brew install postgres` if you don't have it installed):
    
    postgres -D /usr/local/var/postgres

If you want it to run automatically everytime at boot:
    
    launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

**Fourth**, create the databases:

    rake db:create

**Fifth**, migrate the databases:

    rake db:migrate

**Lastly**, start the server:

    rails server

Happy developing!
