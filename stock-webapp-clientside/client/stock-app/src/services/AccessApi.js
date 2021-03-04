const API_URL = "http://131.181.190.87:3000/";

//fetch
//get all data from endpoint /stocks/symbols
export async function fetchAll(setApiRowData) {
  const urlPath = API_URL + "stocks/symbols";
  /*fetchall*/
  await fetch(urlPath)
    .then((res) => res.json())
    .then((res) =>
      res.map((stock) => {
        return {
          name: stock.name,
          symbol: stock.symbol,
          industry: stock.industry,
        };
      })
    )
    .catch((error) => {
      console.log("cannot Connect to the Api Error :");
      console.log(error);
    })
    .then((stocks) => setApiRowData(stocks));
}

//get all stock history from api
export async function fetchAuthStockByDate(
  setApiRowData,
  companySelected,
  earliestDate,
  latestDate
) {
  const urlPath =
    API_URL +
    "stocks/authed/" +
    companySelected +
    "?from=" +
    earliestDate.toJSON() +
    "&to=" +
    latestDate.toJSON();
  await fetch(urlPath, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (res.ok) {
        res
          .json()
          .then((res) =>
            res.map((stock) => {
              return {
                date: stock.timestamp.substr(0, stock.timestamp.indexOf("T")),
                open: stock.open,
                high: stock.high,
                low: stock.low,
                close: stock.close,
                volumes: stock.volumes,
              };
            })
          )
          .then((stocks) => {
            setApiRowData(stocks);
          });
      } else {
        setApiRowData([
          {
            date: "",
            open: "",
            high: "",
            low: "",
            close: "",
            volumes: "",
          },
          { date: "", open: "", high: "", low: "", close: "", volumes: "" },
        ]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
//get a single most recent stock from
export async function fetchSingleRecentStock(setApiRowData, companySelected) {
  const urlPath = API_URL + "stocks/" + companySelected;
  await fetch(urlPath)
    .then((res) => res.json())
    .then((stock) => {
      return {
        date: stock.timestamp.substr(0, stock.timestamp.indexOf("T")),
        open: stock.open,
        high: stock.high,
        low: stock.low,
        close: stock.close,
        volumes: stock.volumes,
      };
    })
    .catch((error) => {
      console.log(error);
    })
    .then((stocks) => {
      setApiRowData(stocks);
    });
}
//signup
export async function handleLogIn(
  email,
  password,
  setPassword,
  setErrorMessage,
  userHasAuth,
  history
) {
  const url = API_URL + "user/login";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  const res_1 = await res.json();
  if (res_1.error) {
    const errorMessage = res_1.message;
    setErrorMessage(errorMessage);
    setPassword("");
  } else {
    userHasAuth(true);
    console.log(res_1.token);
    localStorage.setItem("token", res_1.token);
    history.push("/stocks");
  }
}
//signup
export async function handleRegistration(
  email,
  password,
  rePassword,
  setErrorMessage,
  setPassword,
  setRePassword,
  userHasAuth,
  history
) {
  const API_URL = "http://131.181.190.87:3000";
  const url = API_URL + "/user/register";

  if (password !== rePassword) {
    setErrorMessage("Passwords don't match");
    setRePassword("");
    setPassword("");
  } else if (!email.includes("@") || email.length < 4) {
    setErrorMessage("Email must be proper email");
  } else {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const res_1 = await res.json();
    if (res_1.error) {
      console.log(res_1.message);
      setErrorMessage(res_1.message);
    } else {
      handleLogIn(
        email,
        password,
        setPassword,
        setErrorMessage,
        userHasAuth,
        history
      );
    }
  }
}
