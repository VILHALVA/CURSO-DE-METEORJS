# INTRODUÇÃO
**METEOJS** é uma biblioteca JavaScript usada para acessar e manipular dados meteorológicos. Esta biblioteca facilita a obtenção de informações meteorológicas de diversas fontes, permitindo que desenvolvedores integrem dados climáticos em suas aplicações web de forma simples e eficiente.

## Principais Funcionalidades
1. **Obtenção de Dados Meteorológicos**: Facilita a recuperação de dados climáticos de várias APIs.
2. **Manipulação de Dados**: Oferece métodos para manipular e formatar dados meteorológicos.
3. **Visualização de Dados**: Integra-se com bibliotecas de gráficos para visualização de dados meteorológicos.

## Exemplo Básico de Uso
Abaixo está um exemplo simples de como utilizar o METEOJS para obter e exibir dados meteorológicos:

1. **Instalação do METEOJS**: Primeiro, é necessário instalar a biblioteca. Você pode fazer isso usando npm ou diretamente importando no HTML.

```html
<!-- Importação via CDN -->
<script src="https://cdn.jsdelivr.net/npm/meteojs"></script>
```

2. **Uso Básico**: Em seguida, você pode usar a biblioteca para obter dados meteorológicos. Aqui está um exemplo de como obter a temperatura atual de uma cidade.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo METEOJS</title>
    <script src="https://cdn.jsdelivr.net/npm/meteojs"></script>
</head>
<body>
    <div id="weather"></div>

    <script>
        // Inicializa a biblioteca METEOJS
        const meteo = new MeteoJS({
            apiKey: 'SUA_API_KEY', // Insira sua chave de API aqui
            location: 'São Paulo, BR' // Localização desejada
        });

        // Obtém os dados meteorológicos
        meteo.getCurrentWeather()
            .then(data => {
                // Exibe a temperatura atual
                document.getElementById('weather').innerHTML = 
                    `A temperatura atual em São Paulo é ${data.temperature}°C.`;
            })
            .catch(error => {
                console.error('Erro ao obter dados meteorológicos:', error);
            });
    </script>
</body>
</html>
```

## Explicação do Código
- **Importação do METEOJS**: A biblioteca é importada diretamente via CDN.
- **Configuração do METEOJS**: A instância do `MeteoJS` é configurada com uma chave de API e uma localização específica.
- **Obtenção de Dados**: Utiliza-se o método `getCurrentWeather()` para obter a temperatura atual da localização configurada.
- **Exibição dos Dados**: A temperatura é exibida dentro de um elemento HTML com o id `weather`.

## Conclusão
O METEOJS é uma ferramenta poderosa para integrar dados meteorológicos em suas aplicações web. Com ele, é possível obter e manipular dados climáticos de forma eficiente, proporcionando uma melhor experiência ao usuário.
