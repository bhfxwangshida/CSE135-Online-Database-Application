# CSE135
For CSE135(sp22) at UCSD.

This repo uses Github Action to deploy to our web server continuously.
Content under the public_html directory will be synchronized to the server. 


# Password
user: grader  
password: PLEASE CHECK IN OUR SUBMISSION - README.md 

# Link to our website
https://felixwangsd.xyz


# Details of Github auto deploy setup
### Github link
https://github.com/daixi98/CSE135
## Github Action
We use Github Action for auto deploy. After each push, Github Action will connect to our server and use "scp" command to sync.
### Create Action
Create .github/workflows/deploy.yml
### deploy.yml
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
Configure environment variables, which are used to connect our server. 

# Username/password for logging into the site
user: grader   
password: PLEASE CHECK IN OUR SUBMISSION - README.md   

# Summary of changes to HTML file in DevTools after compression
  The html shrinks from 1.3KB to 978B after compression. However, the images remains the same, this is because the images are already compressed.

# Summary of removing 'server' header
$ sudo apt install libapache2-mod-security2  

$ sudo a2enmod security2  

$ sudo vim /etc/apache2/conf-available/security.conf  

```
ServerTokens Full  
ServerSignature Off  
SecRuleEngine on  
SecServerSignature "CSE135 Server"  
```

$ sudo systemctl restart apache2  
