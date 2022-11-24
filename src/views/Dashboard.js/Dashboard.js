// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Doanh thu theo tháng',
        },
    },
};

const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
    'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

export const dataBar = {
    labels,
    datasets: [
        {
            label: 'đơn vị (triệu)',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        // {
        //     label: 'Dataset 2',
        //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // },
    ],
};

export const data = {
    labels: ['Điện thoại', 'Laptop', 'Máy tính bảng'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 8],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const Dashboard = () => {

    return (
        <div style={{ backgroundColor: '#edf1f5', minWidth: '100vh' }}>
            <div className="container-fluid pt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-12">
                        <div className="white-box analytics-info">
                            <h3 className="box-title">Sản phẩm</h3>
                            <ul className="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div id="sparklinedash">
                                        <i className="fas fa-laptop"
                                            style={{ fontSize: '1.8rem', color: '#7c7ce3' }}></i>
                                    </div>
                                </li>
                                <li className="ms-auto"><span className="counter text-success"
                                    style={{ fontWeight: '700' }}>54</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="white-box analytics-info">
                            <h3 className="box-title">Đơn hàng</h3>
                            <ul className="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div id="sparklinedash2">
                                        <i className="fas fa-shopping-cart"
                                            style={{ fontSize: '1.8rem', color: 'green' }}></i>
                                    </div>
                                </li>
                                <li className="ms-auto"><span className="counter text-purple"
                                    style={{ fontWeight: '700' }}>120</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="white-box analytics-info">
                            <h3 className="box-title">Tài khoản</h3>
                            <ul className="list-inline two-part d-flex align-items-center mb-0">
                                <li>
                                    <div id="sparklinedash3"><i className=" fas fa-user"
                                        style={{ fontSize: '1.8rem', color: '#ebeb51' }}></i>
                                    </div>
                                </li>
                                <li className="ms-auto"><span className="counter text-info"
                                    style={{ fontWeight: '700' }}>78</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'
            >
                <div className='row ml-1 mr-1 pt-5'
                    style={{ backgroundColor: '#fff' }}>
                    <div className='col-md-4'>
                        <div
                            style={{ width: '100%' }}
                        >
                            <Doughnut data={data} />
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div
                            style={{ width: '100%' }}
                        >
                            <Bar options={options} data={dataBar} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard