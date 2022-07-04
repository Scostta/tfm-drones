# tfm-drones

Dapp web 3 basado en un sistema de fumigación con drones

## Descripcion del entorno

### APP

    - Chakra: Para el tema del estilado de la app
    - Styled-components
    - Ethers.js: para leer informacion de la blockchain
    - Jotai: en susticion al contexto de react
    - React-router-dom: para el enrutado de la app

### SMART CONTRACTS

    - Truffle
    - @Oppenzeppelin/contracts
    - @truffle/hdwallet-provider

## Instalación del proyecto

git clone del proyecto

### SMART CONTRACTS

Se ha hecho uso de una red local como ganache

1. /smartcontracts `npm i` para instalar dependecias
2. `truffle migrate` para lanzar las migraciones

### APP

1. /app lanzar el comando `yarn` para instalar dependecias
2. copiar dentro de /app/src/contants las dirrecciones de los contratos
3. dentro de la carpeta /abis copiar los abis de los contratos donde corresponde
4. lanzar el comando `yarn run dev` y entrar en http://localhost:3000
5. Si no funciona el boton de conectar metamask, recargar la pagina... (no he tenido tiempo a solucionarlo)

## Enlaces

- [manual de usuario]
