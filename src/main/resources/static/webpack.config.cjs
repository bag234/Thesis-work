var path = require('path');
  
module.exports = {
    entry: "./src/index.jsx", // входная точка - исходный файл
    
    output:{
        path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/public/',
        filename: "build.js"       // название создаваемого файла
    },
    devServer: {
     contentBase: path.join(__dirname),
     compress: true,
     port: 8066
   },
    module:{
        // loader:[
        // { 
        //     test: /\.css$/, 
        //     loader: "style-loader!css-loader" 
          
        // }],
        rules:[   //загрузчик для jsx
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            }
        ]
    }
}