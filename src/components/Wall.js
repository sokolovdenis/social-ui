import React from 'react'

import './App.css'
import Article from './Article'

const Wall = ({articles, history}) => {
  if (articles.length === 0) {
    return <div>Тут ничего нет. Но могла бы быть ваша реклама</div>
  }
  return (
    <main>
      <section>{articles.map(a => 
        <Article 
          author={a.user.name} 
          body={a.text} 
          date={a.dateTime} 
          authorImage={a.user.imageUrl}
          image={a.imageUrl}
          authorLink={function(){history.push('/user/' + a.user.id)}} />)}
      </section>
    </main>
)}

export default Wall
