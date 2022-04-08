# CSE135
For CSE135(sp22) at UCSD.

### Github Action
This repo uses Github Action to deploy to our web server continuously.
Content under the public_html directory will be synchronized to the server. 

# Github-deploy
## github link
https://github.com/bhfxwangshida/CSE135-Online-Database-Analytics-Application

# Employ password protection
## password
user: felix, adam, grader
password: cse135Go

## Configuring Access Control within the Virtual Host Definition
  <Directory "/var/www/felixwangsd.xyz/public_html">
      AuthType Basic
      AuthName "Restricted Content"
      AuthUserFile /etc/apache2/.htpasswd
      Require valid-user
  </Directory>

# Compress Textual Content
  The html shrinks from 1.3kb to 978b after compression. However, the images remains the same, this is because the images are already compressed.

# Obscure server identity
$ sudo apt install libapache2-mod-security2

$ sudo a2enmod security2

$ sudo vim /etc/apache2/conf-available/security.conf

ServerTokens Full

ServerSignature Off

SecRuleEngine on

SecServerSignature "CSE135 Server"

$ sudo systemctl restart apache2
