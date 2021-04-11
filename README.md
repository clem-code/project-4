## General Assembly Project 4 

# **Folio**

<b>The Developers:</b>

Clement Knox, Vesna Zivanovic, and Tom Briody

<b>Timeframe:</b>

1 week

<b>The Goal:</b>

To build a full-stack app our choice from scratch using a Flask/Python backend and a React frontend and then deploy it using Heroku. 

Technologies Used:

<b>Frontend:</b>
<ul>
<li>HTML5</li>
<li>JavaScript (ES6)</li>
<li>SASS</li>
<li>Semantic UI React</li>
<li>React</li>
<li>React-Router</li>
<li>Webpack</li>
</ul>
<b>Backend:</b>
<ul>
<li>Flask</li>
<li>Python</li>
<li>Marshmallow</li>
<li>SQLAlchemy</li>
</ul>
<b>External Libraries</b>
<ul>
<li>Axios</li>
<li>React.viz</li>
</ul>
<b>Other</b>
<ul>
<li>Github</li>
<li>Git</li>
<li>Heroku</li>
</ul>


<b>The App:</b>

*Folio* is a clone of popular trading platforms like Etoro and Robin Hood. On the frontend, the user can sign up as a retail investor, browse and research stocks and cryptocurrencies, purchase assets (we provide each user with 100,000 dollars upon registration!), and monitor the performance of their portfolio. The user interface was built using a library none of us had used before, Semantic React UI, which brought its own challenges. Behind the scenes Folio's backend was powered by Flask, Python, and Marshmallow and consisted of a database of 26,000 US equities and over 5000 cryptocurrencies. We used SQLAlchemy to build relationships between the users, the assets on sale, and the transaction objects that recorded sales and purchases. 

The biggest challenges we faced on this project came about because we wanted Folio to be able to host crypto and stocks. This meant that whilst our backend treated these as generalized assets available for purchase, on the frontend we were interacting with third-party APIs that tended to silo the two asset classes. A large part of this project was ensuring that the website felt the same to users whether they were browsing for stocks or crypto, when in fact practically every page had been carefully coded to account for the fact that we had to talk to totally different APIs depending on the asset class! Finally, we wanted to include some simple data visualizations. On the individual asset page, we used React Viz to provide a simple line chart of the stock/coin's three month performance. 

<b>Use the deployed version here:</b>

<a href='https://foliotrading.herokuapp.com/'>https://foliotrading.herokuapp.com/</a>

<br>

<img align = 'center' src='https://i.imgur.com/qvCCn8D.png' >


## Building *Folio*

### _The Process_


The basic idea of building a trading platform was made after a brief group discussion. The aim of this project was to expand upon our recently-acquired knowledge of backend programming and demonstrate how we could use APIs (our own and those of third parties!) to build something a bit more ambitious than a CRUP application. A trading platform with thousands of different assets, data displayed in graphs and charts, real-time pricing, and a dynamically calculated portfolio was the ideal project to challenge us whilst for testing out these new skills.

We spent the first day brain-storming and whiteboarding out ideas for how the website would be structured on the frontend and the backend.

<img align = 'center' src='https://i.imgur.com/ZI5qQ4f.png' >

<i>An early blueprint for our frontend.</i>

<br><br>
Then we began thinking about how we would structure the development of the project. We decided to do the back-end jointly, by pair-programming. We did this because we knew version control would be a big issue and it was important that we started out knowing that our back-ends were all structured the same way so as to avoid facing problems further down the line. We had a built a back-end together before but this time we were using SQLAlchemy and Flask, not Mongoose and MongoDB, and so even though our backend was pretty simple, working out the relationships between users, assets, and transactions was a bit harder than it was in Project 3!

We were keen to make sure that everyone did everything to avoid the siloing of skills and knowledge. At the same time, it made sense to split the work initially to get the skeleton of the website up and running. This meant that everyone took ownership of certain parts of the code--Vesna built the home, login and registration pages, Tom built the navbar and portfolio pages, and Clement did the research, asset, and trading pages--but then we all spent time revising, debugging, and restyling all the different parts of the website. To challenge ourselves with a new CSS framework we agreed at the beginning to use Semantic React UI to build the various components. This helped standardize the look of the app but bought plenty of challenges along with it as it was totally new to us and we were learning it on the fly.

How did it go? 

It was a lot of work! We worked well as a team and once we scored some early wins--like building the back-end quickly--our nerves settled and we got into a good routine. However, our project was a lot more ambitious than we first realized in part because we had decided to do stocks and crypto which effectively doubled the work on each component. This also meant we had to use a lot of third-party APIs--I counted 8 in total--which brought its own complications, not least when it came to deployment! However, we knew at the outset we were pushing ourselves and ultimately were satisfied that with the experience of applying our new knowledge of Flask and Semantic React UI to help build something a little different!


## The Code

### _The Back-End

Our back-end was built using Python, Flask, Marshmallow, and SQLAlchemy. Essentially, we built our API using a Model-View-Controller (MVC) pattern to structure the endpoints. At a very high level there were two basic data collections: users and assets. We had a model for a user and a model for an asset, and then views and controllers for each.

<i>Our User Model</i>

```
	class User(db.Model, BaseModel):

    __tablename__ = "users"

    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    wallet = db.Column(db.Float, nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)

    # ? Create a relationship field to trades
    trades = db.relationship("Trade", backref="user", cascade="all, delete")
    # ? Create a relationship field to stocks
    favourites = db.relationship(
        "Stock", backref="user", cascade="all, delete", secondary=users_stocks_join
    ) 
```
Security concerns were paramount for the user model. So we used bcrypt to provide basic data protections for user information.

The asset model was actually very simple. It consisted of three pieces of information: the asset name ('Tesla'), the asset symbol ('TSLA'), and the asset type ('stock' or 'crypto'). We kept the backend data for the assets lightweight because it would have been very taxing to try and keep up-to-date financial information on 31,000 assets on our backend. Instead, we wanted to use these simple pieces of data to speak to third-party APIs that held current asset information.  

But as you can see from the User model above that wasn't the end of the story. Our User model interacted with our Stock model in two crucial ways. When the user bought or sold an asset, they generated a trade object that recorded the details of the transaction. This included a relationship between the trade object and the user who had generated it (user_id) as well as the asset being traded (stock_id). These were both many-to-one relationships. 

<i>Our Trade Model</i>

```
class Trade(db.Model, BaseModel):

    __tablename__ = "trades"

    name_of_asset = db.Column(db.String(100), nullable=False)
    asset_price = db.Column(db.Float, nullable=False)
    qty_purchased = db.Column(db.Float, nullable=False)
    total_trade_value = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(10), nullable=False)
    asset_type = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))
    stock_id = db.Column(db.Integer, db.ForeignKey("stocks.id", ondelete="CASCADE"))
```

However, there was also a many-to-many relationship in our database. We wanted a 'Favourites' functionality. This would allow users to browse and favourite assets that they could then later purchase. Many users could favourite many stocks, so we built a join table to enable this kind of data relationship.

<i>Our Join Table</i>

```
	users_stocks_join = db.Table(
    	"favourites",
    	db.Column("user_id", db.Integer, db.ForeignKey("users.id"), 		primary_key=True),
    	db.Column("stock_id", db.Integer, db.ForeignKey("stocks.id"), 		primary_key=True),
		)

```
Making the controllers was pretty easy. We made them for users to register, login, and trade, as well as those that allowed us to find and favourite specific assets. We enabled some basic authorizations and permissions for security purposes. Because we were working with Python we used Marshmallow to serialize and deserialize as needed. 
  
<i>The controller that adjusted the wallet of each user after a transaction</i>

```
@router.route("/<int:user_id>/wallet", methods=["PUT"])
@secure_route
def update_wallet(user_id):

    existing_user = User.query.get(user_id)
    qty_dictionary = request.json

    if not existing_user:
        return {"message": "No user found"}
    if existing_user != g.current_user:
        return {"errors": "Unauthorized"}, 401

    try:
        user = user_schema.load(
            qty_dictionary,
            instance=existing_user,
            partial=True,
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    user.save()

    return user_schema.jsonify(user), 201
```

### _The Front-End

<b>Structure</b>


Our front-end was structured in our App.js file using React Router which created a number of pathways to pages which we then stitched together using links.

<i>Our app.js file:</i>

```
	const App = () => (
  <BrowserRouter>
    <Sidebar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/portfolio" component={Portfolio} />
      <Route exact path="/research" component={Research} />
      <Route exact path="/trading" component={Trading} />
      <Route exact path="/asset/:assetId" component={Asset} />
      <Route exact path="/about" component={About} />
    </Switch>
    <Footer />
  </BrowserRouter>
)

```

Having all the components and all the paths visible on one page really helped in terms of structuring the front-end and dividing the workload between the three of us. 

<b>Research and Asset Page</b>

<img align = 'center' src='https://i.imgur.com/5pqnCOc.gif' >

When the user makes their account they'll want to see what's on offer before they dive in and make a trade. We planned out a simple research page, with some financial news, some top-line market information, and a search bar where our users could search our back-end for assets. If they searched for BTC (Bitcoin) some basic information appear and this would link to another page--the asset page--where there would be a lot more information available. On the research page they could also 'Favourite' an asset, or if it was already favourited, unfavourite it!

<img align = 'center' src='https://i.imgur.com/kqz40Uv.png'>
<img align = 'center' src='https://i.imgur.com/xUyfQQ2.png'>

The problem we discovered was that on the backend some of the assets had the same ticker symbols. 'ETH' referred to Ethereum but also to Ethan Allen Interiors Inc... This meant we needed different controllers to search for cryptos and stocks. This wasn't so bad as we already had made a distinction between cryptos and stocks on our Stock model. However, the third-party APIs we were pulling current data from were all organized differently and all tended to specialize in either crypto or stocks. As we were students using the most basic tier of membership for these APIs (the free one!) we were having to scout around looking for which API we could use to get different data points. At the highest level, when a user wanted to know about crypto we would show them a totally different set of data pulled from a totally different set of APIs versus if they had searched for stocks.

For instance, here are the functions that generate the line chart (built using React Viz) on the asset page:

```
useEffect(() => {

    async function graphFunc() {
      const { data } = await axios.get(`https://api.marketstack.com/v1/eod?access_key=b423407c1ef7cdb1569a2f04fc263513&symbols=${asset}`)
      updateGraphData(data.data.slice(0, 90))
    }
    async function cryptoGraphFunc() {
      const { data } = await axios.get(`https://data.messari.io/api/v1/assets/${asset}/metrics/price/time-series?start=2020-12-01&interval=1d`)
      const cryptoTimeSeries = data.data.values.reverse().slice(0, 90)
      updateGraphData(cryptoTimeSeries)

    }
    if (assetType !== 'crypto') {
      graphFunc()
    } else {
      cryptoGraphFunc()
    }

  }, [])

```   
This was a challenge that replicated itself across almost every page. We overcame it, and for users it was largely invisible, but it was probably the most significant coding problem we wrestled with over the course of this project.
<br>

<b>Trading Page</b>

<img align = 'center' src='https://i.imgur.com/Twa8don.gif'>


This was the fun part! Building a UI that faithfully mimicked a real-life trading platform was actually a really enjoyable challenge. Thankfully, our back-end controllers were working fine so we didn't face too many difficulties on that front. In essence, we had to do 5 things on this page.

1. Search for assets to buy/sell
2. Allow the user to input quantities to buy/sell
3. Test whether this trade was permitted -- that they had sufficient funds, for instance, to make a purchase.
4. If the trade was permitted then POST a trade model to the back-end...
5. ...and PUT the User model to adjust the amount in the user's wallet accordingly.

The program to adjust the user's wallet was built on the front-end and generated a revised wallet amount based on the trade and made a PUT request based on that trade. 

<i>Some basic error handling was integrated into the UI</i>
<img align = 'center' src='https://i.imgur.com/OuhjNPW.png'>

The trade object was created using this piece of logic: 

```
 if (showSell) {
      trade = {
        asset_price: Number(quote),
        qty_purchased: Number(tradeQTY * -1),
        total_trade_value: Number(tradeValue),
        transaction_type: 'sell',
        name_of_asset: asset,
        asset_type: assetClass
      }
    } else {
      trade = {
        asset_price: Number(quote),
        qty_purchased: Number(tradeQTY),
        total_trade_value: Number(tradeValue),
        transaction_type: 'buy',
        name_of_asset: asset,
        asset_type: assetClass
      }
    }
```
and then POSTed to the backend. Note that the sell orders were listed using negative qty_purchased values. This had some important implications for how the portfolio page was organized...


<b>Portfolio Page</b>

Some of the most complex code was on the Portfolio page. This was because on this page we had to compile all the transactions associated with a specific user, divide them up by asset, combine them to discover the current holding, and then do a fetch request to a third-party API to discover the current value of that holding. This information then had to be displayed on programatically built tables on the page. Once again, we encountered the now-familiar problem of the crypto/stock divide that ran down the middle of this whole project, as we had to calculate the crypto holding values and the stock holding values separately...

<i>Some complex code for determining the current value of stock holdings in the portfolio.</i>

```
useEffect(() => {
    const helperFunction = async () => {
      const stocks = filterStocks()
      const stockNames = [...new Set(stocks.map((stock) => stock.name_of_asset))]

      const stockPrices = await Promise.all(stockNames.map(async (stockName) => ({ name: stockName, price: await getPrice(stockName) })))
      const groupedTrades = filterStocks().reduce((acc, trade) => {

        const existingObject = acc.find(obj => obj.name === trade.name_of_asset)
        if (existingObject) {
          existingObject.stocksHeld = existingObject.stocksHeld + trade.qty_purchased
          existingObject.pricePaid = existingObject.pricePaid + trade.total_trade_value
          existingObject.currentValue = existingObject.stocksHeld * (stockPrices.find(price => price.name === trade.name_of_asset).price)
          return acc
        } else {
          return [...acc, {
            name: trade.name_of_asset,
            stocksHeld: trade.qty_purchased,
            pricePaid: trade.total_trade_value,
            currentValue: (stockPrices.find(price => price.name === trade.name_of_asset).price) * trade.qty_purchased
          }]
        }
      }, [])
      updateYourStocks(groupedTrades)
    }
    helperFunction()
  }, [tradeData])

```
Needless to say, a lot of quirky bugs were thrown up in this process, but in the end we had the page looking pretty good!

<img align = 'center' src='https://i.imgur.com/DfUWtJt.png'>


<b>Styling</b>


We made the decision to use Semantic React UI which brought its ups and downs. It made it easier to standardize the look of the website whilst making the layout of each page slightly harder to engineer as we were unfamiliar with the grid system the library depended on. Semantic also threw up a load of errors when were setting up the client files initally and when we were finally deploying to Heroku. But it was all good experience in the end!

When it was working Semantic did make things look very professional. We loved our Navbar, for instance. On the trading page, the modals were all powered by Semantic, and again, we thought they looked pretty cool! 

We used teal, black, and white as the dominant colours and picked out Poppins from Google Fonts as the primary font. We pulled some stock images from FreePik.com and some of our own screenshots hosted on Imgur to add some visual elements to the Home and About page.


### _Conclusion_



<b><p>Wins</p></b>

* We wanted to build a full-stack trading platform which hosted stocks and cryptocurriencies held in an API built from scratch that interact with a clean, intuitively designed front-end -- and we did!
* The team worked really well together. We communicated throughout and debugged each other's code when we ran into problems, which we all did at various times! We were able to divide up the work in way which made sense but gave everyone exposure to every part of the code base.
* We challenged ourselves by using a totally new CSS framework, Semantic React UI, and learnt it on the fly during a project where we all felt the time pressure. It was stressful at times but a very good learning experience overall! 

<b><p>Challenges</p></b>

* We made a trade-off between having a relatively simple back-end in order to create a more ambitious front-end. What this led to were some very large, ungainly components. If we had more time, refactoring would have been a high priority!
* We bit off a lot and consequently had to scale back some of our ambitions. We wanted to a lot more with React Viz by way of portfolio visualizations but these were put on ice due to time constraints.
* Relying on so many different third-party APIs created problems with deployment as well as in development due to keys expiring or usage limits being reached. 

<b><p>What We Could Add</p></b>

* More data visualizations! There was so much more we could have done but with deadlines looming we have to limit ourselves to a simple line chart on the asset page.
* We wanted to add more to the research page and make it more responsive and better styled. Again, time constraints meant we had to apply ourselves elsewhere in order to deploy on time.


