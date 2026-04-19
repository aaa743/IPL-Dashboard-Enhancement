import './index.css'

const NotFound = () => {
  const notFoundMessage = 'Page Not Found !!'

  return (
    <div className='container'>
      <h1 className='not-found-heading'>{notFoundMessage}</h1>
    </div>
  )
}

export default NotFound
