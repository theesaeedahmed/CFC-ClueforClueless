from app import create_app
from config import Config

debugger_enabled = Config.DEBUG

app = create_app()

if __name__ == "__main__":
    app.run(debug=debugger_enabled, port=Config.PORT)
