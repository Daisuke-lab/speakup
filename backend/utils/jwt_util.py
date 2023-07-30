from accounts.models import Account
from .oauth_util import OAuthUtil
import jwt
from django.conf import settings
import json



class JWTUtil():



    def get_token(request):
        if request.headers.get("Authorization") is not None:
            return request.headers.get("Authorization").replace("Bearer ", "")
        
    def decode_token(token):
        #token = JWTUtil.get_token(request)
        header, payload, signature = token.split('.')
        header = JWTUtil.decode_jwt(header)
        payload = JWTUtil.decode_jwt(payload)
        signature = JWTUtil.decode_jwt(signature)
        return header, payload, signature
    
    def decode_jwt(chunk):
        decoded_chunk = jwt.utils.base64url_decode(chunk.encode('utf-8'))
        decoded_json = json.loads(decoded_chunk)
        return decoded_json
    
    def get_jwt_header(request):
        token = JWTUtil.get_token(request)
        header, payload, signature = token.split('.')
        return JWTUtil.decode_jwt(header)
    
    def get_jwt_payload(request):
        token = JWTUtil.get_token(request)
        header, payload, signature = token.split('.')
        return JWTUtil.decode_jwt(payload)
    
    def get_jwt_signature(request):
        token = JWTUtil.get_token(request)
        header, payload, signature = token.split('.')
        return JWTUtil.decode_jwt(signature)
    
    
    def verify_jwt(request):
        token = JWTUtil.get_token(request)
        header = JWTUtil.get_jwt_header(request)
        public_key = OAuthUtil.get_google_public_key(header["kid"])
        try:
            print(public_key)
            # Verify the JWT using the RSA public key
            #decoded_payload = jwt.decode(token, public_key, algorithms=["RS256"])
            claims = jwt.decode(token,
                    public_key,
                    issuer=settings.GOOGLE_OAUTH["issuer"],
                    audience=settings.GOOGLE_OAUTH["client_id"],
                    algorithms=["RS256"])
            return True
        except jwt.ExpiredSignatureError:
            print("token is expired")
            return False
        except jwt.InvalidTokenError:
            print("token is invalid")
            return False
        
    def get_provider(request):
        payload = JWTUtil.get_jwt_payload(request)
        issuer = payload.get("iss")
        
        if settings.GOOGLE_OAUTH["issuer"] in issuer:
            return settings.GOOGLE_OAUTH["provider"]

        
    def get_account(request):
        provider = JWTUtil.get_provider(request)
        payload = JWTUtil.get_jwt_payload(request)
        provider_account_id = payload.get("sub")
        
        accounts = Account.objects.filter(provider=provider, provider_account_id=provider_account_id)
        if len(accounts) > 0:
            return accounts[0]
        
    def get_user(request):
        account = JWTUtil.get_account(request)
        if account is not None:
            return account.user


