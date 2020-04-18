import React, { Component } from "react";
import axios from "axios";
import x0p from "x0popup";
import "x0popup/dist/x0popup.min.css";
import M from "materialize-css";

const Currency = (props) => (
  <tr>
    <td>{props.currency.currencyName}</td>
    <td>{props.currency.currencyCode}</td>
    <td>{props.currency.rateToEuro}</td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.editCurrency(props.currency.currencyCode);
        }}
      >
        edit
      </a>
      |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteCurrency(props.currency.currencyCode);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class Currencies extends Component {
  constructor(props) {
    super(props);
    this.deleteCurrency = this.deleteCurrency.bind(this);
    this.editCurrency = this.editCurrency.bind(this);
    this.state = {
      currencies: [],
    };
  }

  deleteCurrency(code) {
    axios
      .delete("http://localhost:5000/currency/" + code)
      .then((res) =>
        M.toast({ html: "Deleted successfully", classes: "orange rounded" })
      );
    this.setState({
      currencies: this.state.currencies.filter(
        (el) => el.currencyCode !== code
      ),
    });
  }

  editCurrency(code) {
    x0p(
      {
        title: "Number Check",
        type: "warning",
        inputType: "text",
        inputPlaceholder: "Number Only",
        inputColor: "#F29F3F",
        inputPromise: function (button, value) {
          var p = new Promise(function (resolve, reject) {
            if (value == "" || isNaN(value)) resolve("Not a number!");
            resolve(null);
          });
          return p;
        },
      },
      function (button, text) {
        if (button == "warning") {
          x0p(
            "Congratulations",
            "Your number is " + text + "!",
            "ok",
            false
          ).then((window.location = "/"));
        }
      }
    ).then(function (object) {
      let rate = object.text;
      const rates = {
        rateToEuro: Number(rate),
      };
      axios
        .patch("http://localhost:5000/currency/" + code, rates)
        .catch((err) => console.log(err));
    });
  }

  componentWillMount() {
    axios
      .get("http://localhost:5000/currency")
      .then((res) => {
        this.setState({ currencies: res.data });
      })
      .catch((err) =>
        M.toast({
          html: "Error with the client request",
          classes: "red rounded",
        })
      );
  }
  currencies() {
    return this.state.currencies.map((currency) => (
      <Currency
        currency={currency}
        deleteCurrency={this.deleteCurrency}
        key={currency.currencyCode}
        editCurrency={this.editCurrency}
      />
    ));
  }
  render() {
    return (
      <div>
        <h3>Currency exchange rates</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Currency Name</th>
              <th>Currency Code</th>
              <th>Rate to euro</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.currencies()}</tbody>
        </table>
      </div>
    );
  }
}
