



(()=>{
    //my api data
    const apiData = {
        urlRanking: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=',
        urlListingLatest: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=',
        key: 'USE A SUA API KEY'
    }

    //request ranking
    let ranking = () => { 
            fetch(apiData.urlRanking + apiData.key)
            .then( response => {

                if(!response.ok) throw new Error('Erro ao consultar API de ranking: ' + response.status)
                return response.json()

            }).then( api =>{

                let coins = []
                let html = `<table class="table">
                                <thead class="thead-dark">  
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Coin</th>
                                    </tr>
                                </thead>
                            <tbody>` 

                //filter top 10 coins
                api.data.filter( (coin, i) => {
                
                if(coin.rank <= 10){
                        coins[coin.rank] = coin
                }
                })

                //order and print data coins
                coins.map( coin => {
                    
                    html += `<tr>
                                <th scope="row">${coin.rank}º</th>
                                <td>${coin.name} - ${coin.symbol}</td> 
                            </tr>`

                })
                
                html += `</tbody>
                    </table>`

                document.getElementById('loading1').style.display = 'none'
                document.getElementById('top10').innerHTML = html
        

            }).catch( error =>{
                console.log(error.message)
        })
    }    
    //request latests
    let price = () => {        
        
        fetch(apiData.urlListingLatest + apiData.key)
        .then( response =>{

            if(!response.ok) throw new Error('Erro ao consultar API de listas ' + response.status)
            return response.json()

        }).then( api => {         

            let coins = []
            let html = `<table class="table">
                            <thead class="thead-dark">  
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Coin</th>            
                                    <th scope="col">Last Updated</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                        <tbody>`

            //filter top 10 price today
            api.data.filter( (coin, i) => {            
                if(coin.cmc_rank <= 10){
                        coins[coin.cmc_rank] = coin
                }
            })

            //order per price and print data coins      
            coinsOrderPrice = coins.sort((a, b) => { return b.quote.USD.price - a.quote.USD.price})

            coins.map( (a, i )=>{                 
            
                if(coinsOrderPrice){
                    html += `
                        <tr>
                        <th scope="row">${i+1}º</th>
                            <td>${a.symbol} - ${a.name} </td>              
                            <td>${a.last_updated}</td>
                            <td>${a.quote.USD.price}</td>
                        </tr>`
                }

            })
            
            html += `
                </tbody>
            </table>`

            document.getElementById('loading2').style.display = 'none'
            document.getElementById('price').innerHTML = html

        }).catch( error => {
            console.log(error.message)
        })
    }

    //calls
    ranking()
    price()

    //listen click on reload button
    document.getElementById('reload').addEventListener('click', () =>{
        document.getElementById('top10').innerHTML = ''
        document.getElementById('price').innerHTML = ''
        document.getElementById('loading1').style.display= 'block'
        document.getElementById('loading2').style.display= 'block'
        ranking()
        price()
    });
})()