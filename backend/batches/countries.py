import requests
import psycopg2


class CountryMigrater:

    def __init__(self):
        self.conn = psycopg2.connect(host='localhost',
                              user='postgres',
                              password='PostgreSQLのパスワード',
                              database='mydb')
        self.cur = self.conn.cursor()
        self.url = "https://restcountries.com/v3.1/all"

    def get_countries(self):
        res = requests.get(self.url)
        countries = res.json()
        return countries
    
    def language_already_exists(self, code):
        pass

    def nationality_already_exists(self, code):
        pass
    
    def insert_language(self, label, code):
        pass

    def insert_nationality(self, label, code):
        pass
        


    def main(self):
        try:
            countries = self.get_countries()
            for country in countries:
                name = country["name"]["common"]
                code = country["cca"]
                language = country["languages"].get(country["languages"].keys()[0])
                self.insert_language(language, code)
                self.insert_nationality(name, code)
            self.conn.commit()
        except Exception as e:
            print(e)
        finally:
            self.conn.close()

if __name__ == "__main__":
    migrator = CountryMigrater()
    migrator.main()
