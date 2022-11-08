import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react'

Pagination.prototype = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props) {
    const { Pagination, onPageChange } = props;
    const { page, limit, totalRow } = props.pagination;
    // console.log('>>', props)
    const totalPages = Math.ceil(totalRow / limit);
    const [min, setMin] = useState('1')
    const [max, setMax] = useState('5')
    const arrPage = [];

    for (let i = 1; i <= totalPages; i++) {
        arrPage.push(i);
    }
    // console.log(Number(totalPages), arrPage);

    // let pageIncrementEllipses = null;
    // if (pages.length > maxPageLimit) {
    //     pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    // }
    // let pageDecremenEllipses = null;
    // if (minPageLimit >= 1) {
    //     pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>
    // }

    function handlePaheChange(newPage, status) {
        if (onPageChange) {
            if (newPage > max && status === 'next') {
                setMax(Number(max) + 5);
                setMin(Number(min) + 5);
            }
            if (newPage % 5 === 0 && status === 'prev') {
                setMax(Number(max) - 5);
                setMin(Number(min) - 5);
            }

            onPageChange(newPage);

        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn-next-prev"
                disabled={page <= 1}
                hidden={page <= 1}
                onClick={() => handlePaheChange(page - 1, 'prev')}
            >
                &lt;
            </button>
            {arrPage && arrPage.map((item, index) => {
                return (
                    (item <= max && item >= min) ? (
                        <span key={item}
                            className={item === page ? 'pagination active' : 'pagination'}
                            style={{ margin: '10px', cursor: 'pointer' }}
                            onClick={() => handlePaheChange(item)}>
                            {item}
                        </span>
                    ) : null

                )
            })}
            <button className="btn-next-prev"
                disabled={page >= totalPages}
                hidden={page >= totalPages}
                onClick={() => handlePaheChange(page + 1, 'next')}
            >
                &gt;
            </button>
        </div>
    );
}


export default Pagination; 