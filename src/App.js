import { useEffect, useState } from 'react';
import './App.css';

// 픽사베이 데이타 가져온다. 시간이 거릴거야... , 문자로만 주고받아라 원칙(json); 
// json --> json encode

const App = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(true);


    const getData = async () => {
        setLoad(true);
        const pixaDataUrl = `https://pixabay.com/api/?key=21103852-9b5f4834542caaf4eef2c8533&q=${search}&per_page=200&lang=ko`;
        const r = await fetch(pixaDataUrl).then(it => it.json());
        setData(r.hits);
        setLoad(false);
    }

    useEffect(() => {
        getData();
    }, [search]);


    const onSubmit = e => {
        e.preventDefault();
        // if (input.length < 3) {
        //     alert('더 입력하세요...')
        //     return
        // }
        setSearch(input);
    };
    const onChange = e => setInput(e.target.value);


    console.log(data);

    if (load) {
        return (
            <div className='load'>
                <i className="xi-spinner-1 xi-spin"></i>
            </div>
        )
    }

    return (
        <div className='app'>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} />
                <button>
                    <i className="xi-search"></i>
                </button>
            </form>
            <ul className='list'>
                {
                    data.map(it => {
                        return (
                            <li>
                                <figure>
                                    <img src={it.largeImageURL} alt="" />
                                </figure>
                                <strong>{it.tags}</strong>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default App;