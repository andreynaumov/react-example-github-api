export const Pagination = ({
  currentPage,
  updateCurrentPage,
}: {
  currentPage: string;
  updateCurrentPage: (page: string) => void;
}) => {
  const PAGINATOR_SIZE = 10;

  return (
    <>
      <ul className='pagination'>
        {Array(PAGINATOR_SIZE)
          .fill(null)
          .map((_, index) => (
            <li key={index}>
              <button
                type='button'
                className={+currentPage === index + 1 ? 'active' : ''}
                onClick={() => updateCurrentPage(String(index + 1))}
              >
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};
