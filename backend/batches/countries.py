import requests
import psycopg2
import traceback

class CountryMigrater:

    def __init__(self):
        self.conn = psycopg2.connect(host='localhost',
                              user='postgres',
                              password='root',
                              database='speakup')
        self.cur = self.conn.cursor()
        

    def get_countries(self):
        url = "https://restcountries.com/v3.1/all"
        res = requests.get(url)
        countries = res.json()
        return countries
    
    def language_already_exists(self, label):
        if label is None:
            return True
        else:
            query = f"SELECT * FROM accounts_language WHERE label='{label}'"
            self.cur.execute(query)
            languages = self.cur.fetchall()
            return len(languages) != 0

    def nationality_already_exists(self, code):
        if code is None:
            return True
        else:
            query = f"SELECT * FROM accounts_nationality WHERE code='{code}'"
            self.cur.execute(query)
            nationalities = self.cur.fetchall()
            return len(nationalities) != 0

    def insert_language(self, label, code):
        query = f"INSERT INTO accounts_language (label, code) VALUES ('{label}', '{code}')"
        self.cur.execute(query)
        

    def insert_nationality(self, label, code):
        query = f"INSERT INTO accounts_nationality (label, code) VALUES ('{label}', '{code}')"
        self.cur.execute(query)
        


    def main(self):
        try:
            countries = self.get_countries()
            for country in countries:
                name = country.get("name", {}).get("common")
                code = country.get("cca2")
                language_key = list(country.get("languages", {"dummy":None}).keys())[0]
                language = country.get("languages", {}).get(language_key)
                if self.language_already_exists(language) is False:
                    self.insert_language(language, code)
                if self.nationality_already_exists(code) is False:
                    self.insert_nationality(name, code)
            self.conn.commit()
        except Exception as e:
            print(traceback.format_exc())
        finally:
            self.cur.close()
            self.conn.close()

if __name__ == "__main__":
    migrator = CountryMigrater()
    migrator.main()
