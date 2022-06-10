# LUIZALABSPROJECT

Desafio técnico da **Magazine Luiza**

## SOBRE

O projeto foi feito em nodejs e não foi utilizado nenhum framework web. Neste projeto eu utilizei um arquivo json para guardar os registros e buscar as informações quando forem necessárias.

## BÍBLIOTECAS

Foi utilizado 3 bibliotecas para auxiliar o desenvolvimento. O **axios** para fazer chamadas de **API**, o **dotenv** para nos ajudar com as variáveis de ambiente e por último a biblioteca do **ava**.

## ESTRUTURA

Em todo o projeto foi pensado em utilizar o design pattern **MVC**. Assim separando a nossa aplicações em camadas para facilitar a manutenção.

## INICIALIZAR API VIA DOCKER

```docker
# build
docker build -t luizalabsproject .

# run
docker run -d -p 9000:9000 luizalabsproject
```

## ROTAS

/getall -> Essa rota irá retornar um json com todos as pessoas cadastradas

/getone/:name -> Essa rota irá trazer todas as pessoas conectadas com esse nome

/getnotfriends/:name -> Essa rota irá trazer todos os amigos do seus amigos

/register -> Essa rota ficou com a responsabilidade inserir um novo registro  

## Contribuição
Fiquem a vontade para contribuir e alertar sobre bugs e novas melhorias.

## License
[MIT](https://choosealicense.com/licenses/mit/)