import React, { Component } from "react";
import axios from "axios";

export default class uploadnew extends Component {
  state = {
    file: "",
    filename: "",
  };

  handleChange = (e) => {
    this.setState({ file: e.target.files[0] });
    // setFilename(e.target.files[0].name);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);

    const res = axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "application/pdf",
        },
      })
      .then(console.log("Sent"))
      .catch((err) => {
        if (err.response.status === 500) {
          console.log("Error With Server");
        } else {
          console.log(err.response.data.msg);
        }
      });
  };

  render() {
    return (
      <div>
        <div>
          <div className="text-5xl">PDF Compressor</div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="file"
                id="myFile"
                name="filename"
                onChange={this.handleChange}
              />
              <input type="submit" />
            </form>
          </div>
        </div>
        );
      </div>
    );
  }
}
