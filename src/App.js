import React, { Suspense } from "react";
import "./App.css";

// const HeaderComponent = React.lazy(() => import("header/Header"));

// const HeaderComponent = React.lazy(() =>
//   Promise.all([
//     import("header/Header").then((module) => ({
//       default: module.Header,
//     })),
//     import("header/HeaderStyle")
//       .then((module) => ({
//         css: module.default,
//       }))
//       .then((results) => {
//         return { default: results[0].default, css: results[1].css };
//       }),
//   ])
// );

const loadComponentWithStyle = async () => {
  const [{ default: Header }, { default: style }] = await Promise.all([
    import("header/Header"),
    import("header/HeaderStyle"),
  ]);
  return { default: Header };
};

const HeaderComponent = React.lazy(loadComponentWithStyle);

const App1 = React.lazy(() => import("app1/App1"));
const App2 = React.lazy(() => import("app2/App2"));
const Footer = React.lazy(() => import("footer/Footer"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading Header...</div>}>
        <HeaderComponent />
      </Suspense>
      <Suspense fallback={<div>Loading App 1...</div>}>
        <App1 />
      </Suspense>
      <Suspense fallback={<div>Loading App 2...</div>}>
        <App2 />
      </Suspense>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
      <h1>Hello Nitish!</h1>
    </div>
  );
}

export default App;
