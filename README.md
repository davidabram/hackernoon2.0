# hackernoon2.0


## Requirements

```bash
Node >= 8
```

### Install
```bash
git clone git@github.com:DavidAbram/hackernoon2.0.git
```

```bash
mkdir loom && cd loom
curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh

./loom init
./loom run
```
You can explore here your blockchain [https://blockexplorer.loomx.io/](https://blockexplorer.loomx.io/)

```bash
# Open second terminal
npm run deploy
npm test

npm serve
```
open [http://http:localhost:8080](http://http:localhost:8080)

Install elastic search by following instructions:

[https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)

or by using docker
```bash
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:tag
```
start indexer
```bash
# Open third terminal
npm run indexer
```

Start elasticsearch instance.



Special thanks & inspiration
----
[https://loomx.io](https://loomx.io)  
[https://hackernoon.com/](https://hackernoon.com)