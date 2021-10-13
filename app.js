const sharp = require("sharp");
const compress_images = require("compress-images");
const fs = require("fs");

let inputPath = process.argv[2];
let width = Number(process.argv[3]);

//console.log(path, width);

resizeImage(inputPath,"./temp/resized_image.jpg", width);

function resizeImage(inputPath, outputPath,  width){

    sharp(inputPath) // 'INPUTPATH' é o 'input' da jogada, ou seja, é a localização onde se encontra a imagem original
        .resize({width: width}) //'WIDTH' é a largura da imagem
        .toFile(outputPath, (err)=>{ // Local de armazenamento(outputPath) onde irá a imagem já redimensionada
            if(err){
                console.log(err)
            } else{
                console.log("Imagem redimensionada com sucesso");
                compress(outputPath, "./compressed/") //O "oUTputPath" é o 'arquivo redimensionado' e o "./compressed/" é o caminho do Arquivo compressed
            }
        })

}

function compress(inputPath, outputPath){ //O "inputPath" é o 'arquivo redimensionado' e o "outputPath" é o caminho do Arquivo compressed

    compress_images(inputPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
                    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                    { svg: { engine: "svgo", command: "--multipass" } },
                    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    function (error, completed, statistic) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log("-------------");

        fs.unlink(inputPath, (error)=>{ //Apagando o arquivo temporário, já que não precisa mais dele
            if(error){
                console.log(error)
            } else{
                console.log(inputPath, " --- Apagada");
                console.log("-------------");
            }
        });
    }
);

}