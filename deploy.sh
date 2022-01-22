git pull

cd "gowon.ca"

yarn build

rm -rf /var/www/gowon.ca/html/
cp -r ./build /var/www/gowon.ca/html