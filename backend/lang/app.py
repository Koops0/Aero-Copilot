from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/docqna',methods = ["POST"])
def processclaim():
    try:
        paragraph = ""
        file_name = ""
        print()
        # input_json = request.get_json(force=True)
        # query = input_json["query"]
        # return "you sent "+query
    except:
        return jsonify({"Status":"Failure --- some error occured"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8095, debug=False)