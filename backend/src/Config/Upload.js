import multer from 'multer'; // Importa o middleware 'multer' para processamento de upload de arquivos
import path from 'path'; // Importa o módulo 'path' para lidar com caminhos de arquivos

export default {
    storage: multer.diskStorage({ // Define a configuração de armazenamento para salvar os arquivos no disco
        destination: path.resolve(__dirname, '..', 'Uploads'), // Define o diretório de destino para salvar os arquivos
        filename: (req, file, genName) => { // Define o nome do arquivo a ser salvo
            const extension = path.extname(file.originalname); // Extrai a extensão do nome original do arquivo
            const name = path.basename(file.originalname, extension); // Extrai o nome do arquivo sem a extensão

            // Gera um nome único para o arquivo usando o nome original, um carimbo de data/hora e a extensão
            genName(null, `${name}-${Date.now()}${extension}`);
        }
    })
};
