export default function BottomList() {
  const items = [
    {
      id: 1,
      imageSrc: 'back.png',
      title: '아이템 1',
    },
    {
      id: 2,
      imageSrc: 'back.png',
      title: '아이템 2',
    },
    {
      id: 3,
      imageSrc: 'back.png',
      title: '아이템 3',
    },
    {
      id: 4,
      imageSrc: 'back.png',
      title: '아이템 3',
    },
    {
      id: 5,
      imageSrc: 'back.png',
      title: '아이템 3',
    },
    {
      id: 6,
      imageSrc: 'back.png',
      title: '아이템 3',
    },
    {
      id: 6,
      imageSrc: 'back.png',
      title: '아이템 3',
    },
    {
      id: 7,
      imageSrc: 'back.png',
      title: '아이템 3',
    },
    {
      id: 8,
      imageSrc: 'back.png',
      title: '아이템 3',
    },
  ];

  return (
    <>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Products</h2>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {items.map((item) => (
              <div key={item.id}>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  style={{ width: '200px', height: '200px' }}
                />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
