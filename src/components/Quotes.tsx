import axios from 'axios';
import { useState, useEffect } from 'react';

interface IQuote {
    content: string;
    author: string;
}

interface IError {
    isError: boolean;
    message: string;
}

const Quotes = () => {
  const [data, setData] = useState<IQuote>({
    content: '',
    author: '',	
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<IError>({
    isError: false,
    message: '',
  });

  const fetchData = () => {
    axios
      .get('https://api.quotable.io/random')
      .then((res) => {
        console.log(res);
        if (!res.data) {
          setError({
            isError: true,
            message: 'No data found',
          });
        }
        setData({
            content: res.data.content,
            author: res.data.author,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError({
          isError: true,
          message: err.message,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      id='quote-box'
      className='bg-white w-1/3 py-8 px-12 rounded-md drop-shadow-lg'
    >
      <div id='quote-text' className='flex flex-col'>
        {loading && <p>Generating quotes...</p>}
        {error.isError && <p>{error.message}</p>}
        {data.content && <h1 id='text' className='font-semibold text-2xl'>{data.content}</h1>}
        {data.author && <p id='author' className='text-right mt-8 italic text-lg text-gray-500'>{`- ${data.author}`}</p>}
      </div>
      <div id='quote-action' className='flex items-center mt-4'>
        <div className='w-1/2 flex flex-row gap-3'>
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecampErpriliano&text=${data.content} - ${data.author}`}
            id='tweet-quote'
            className='bg-blue-400 px-4 py-2 rounded-md drop-shadow-md text-white'
          >
            Tweet
          </a>
        </div>
        <div className='w-1/2 flex justify-end'>
          <button
            id='new-quote'
            className='bg-green-400 px-4 py-2 rounded-md drop-shadow-md text-white'
            onClick={fetchData}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
