import requests
import rsa
import jwt
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization

class OAuthUtil():

    def get_google_public_key(kid):
        url = "https://accounts.google.com/.well-known/openid-configuration"
        res = requests.get(url)
        jwks_uri = res.json()["jwks_uri"]
        res = requests.get(jwks_uri)

        for key in res.json()["keys"]:
            if key["kid"] == kid:
                # Decode the modulus ("n") and public exponent ("e")
                modulus = jwt.utils.base64url_decode(key["n"].encode('utf-8'))
                public_exponent = jwt.utils.base64url_decode(key["e"].encode('utf-8'))

                # Convert the modulus and public exponent to integers
                modulus_int = int.from_bytes(modulus, byteorder='big')
                public_exponent_int = int.from_bytes(public_exponent, byteorder='big')

                # Create the RSA public key
                public_key = rsa.PublicKey(modulus_int, public_exponent_int)
                
                return OAuthUtil.convert_to_pem(public_key)

                #return public_key



    def convert_to_pem(public_key):
        rsa_public_key_pem = public_key.save_pkcs1(format='PEM')
        return rsa_public_key_pem
            




    
        

