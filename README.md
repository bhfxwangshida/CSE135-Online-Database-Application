# CSE135
For CSE135(sp22) at UCSD.

This repo uses Github Action to deploy to our web server continuously.
Content under the public_html directory will be synchronized to the server. 

## Employ password protection
### password
user: felix, adam, grader
password: cse135Go

## Link to our website
https://felixwangsd.xyz


## Details of Github auto deploy setup
### Github link
https://github.com/daixi98/CSE135

# Github Action

## Create Action
Create .github/workflows/deploy.yml
## deploy.yml
```
name: website deployment
on: [push]
jobs:  
  deploy:    
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: deploy website to example.com
        uses: appleboy/scp-action@master
        env:
          HOST: ${{ secrets.HOST }}
          USERNAME: ${{ secrets.USERNAME }}
          PORT: ${{ secrets.PORT }}
          KEY: ${{ secrets.KEY }}
        with:
          source: "dest/*"
          target: "/var/www/example.com/public_html"
          strip_components: 1
```

## Configure env variables for Github Action
Go to Setting -> Secret.  
Config environment variables.  




## Configuring Access Control within the Virtual Host Definition
  <Directory "/var/www/felixwangsd.xyz/public_html">
      AuthType Basic
      AuthName "Restricted Content"
      AuthUserFile /etc/apache2/.htpasswd
      Require valid-user
  </Directory>

## Compress Textual Content
  The html shrinks from 1.3kb to 978b after compression. However, the images remains the same, this is because the images are already compressed.

## Obscure server identity
$ sudo apt install libapache2-mod-security2

$ sudo a2enmod security2

$ sudo vim /etc/apache2/conf-available/security.conf

ServerTokens Full

ServerSignature Off

SecRuleEngine on

SecServerSignature "CSE135 Server"

$ sudo systemctl restart apache2
