import React from 'react';

interface SquareBoxProperties{
    link: string,
    keyword: string
}

const BOX_SIZE: number = 150

const Box: React.FC<SquareBoxProperties> = (
    {
        link,
        keyword
    }
) => {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <div style = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: BOX_SIZE + 'px',
            height: BOX_SIZE + 'px',
            backgroundColor: '#9ccfd8',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '25px',
        }}>
          {keyword}
        </div>
      </a>
    );
  };

export default Box;