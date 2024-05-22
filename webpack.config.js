const { merge } = require("webpack-merge");
const common = require("../webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = merge(common, {
  entry: "./src/index.js", // Ensure this path is correct
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, "public"), // Ensure this path is correct
    },
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:3000/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
        footer: "footer@http://localhost:3002/remoteEntry.js",
        app1: "app1@http://localhost:3003/remoteEntry.js",
        app2: "app2@http://localhost:3004/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
      },
    }),
  ],
});
