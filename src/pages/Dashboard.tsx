import { useEffect, useState } from "react";
import { Layout, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IUser } from "./constants/dashboard.dto";

import logosvg from "../assets/Group.svg";
import avatar from "../assets/avatar.png";
import { fetchUsers } from "../services/helper";
import UserDetails from "./UserDetails";
import usericon from "../assets/icon.png"
import activeuserslogo from "../assets/active.png"
import loanlogo from "../assets/loan.png"
import savingslogo from "../assets/savings.png"
// import notificationlogog from "../assets/notification.png"
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import {
    FiBriefcase, FiUsers, FiChevronDown, FiSearch,
    FiUserCheck,
    FiUploadCloud,
    FiSettings,
    FiDatabase,
    FiArchive,
    FiBarChart2,
    FiBox,
    FiClipboard,
    FiCreditCard,
    FiDollarSign,
    FiFileText,
    FiLayers,
    FiRefreshCcw,
    FiSliders,
    FiStar,
    FiTool,
    FiUser,
    FiUserPlus
} from "react-icons/fi";

import "../styles/dashboard.scss";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const Dashboard = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [activeItem, setActiveItem] = useState<string>("users");
    const navigate = useNavigate();
    const storedUser = JSON?.parse(localStorage.getItem("lendsqrUser") || "{}");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await fetchUsers();
        setUsers(data);
        localStorage.setItem("allUsers", JSON.stringify(data));
        setLoading(false);
    };

    useEffect(() => {
        if (location.pathname.includes("users")) setActiveItem("users");
        if (location.pathname.includes("dashboard")) setActiveItem("dashboard");
        if (location.pathname.includes("loans")) setActiveItem("loans");
        if (location.pathname.includes("savings")) setActiveItem("savings");
    }, [location.pathname]);

    const renderStatus = (status: string) => {
        const cls = status?.toLowerCase();
        return <span className={`status-pill ${cls}`}>{status}</span>
    };

    const columns: ColumnsType<IUser> = [
        { title: "ORGANIZATION", dataIndex: "organization", key: "organization" },
        { title: "USERNAME", dataIndex: "name", key: "name" },
        { title: "EMAIL", dataIndex: "email", key: "email" },
        { title: "PHONE NUMBER", dataIndex: "phone", key: "phone" },
        {
            title: "DATE JOINED",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value: string) => {
                const date = new Date(value);
                const day = date?.getDate();
                const month = date?.toLocaleString("en-US", { month: "short" });
                const year = date?.getFullYear();
                const time = date?.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                });
                return `${day} ${month} ${year} ${time?.toLowerCase()}`;
            },
        },
        {
            title: "STATUS",
            dataIndex: "status",
            key: "status",
            render: (value) => renderStatus(value)
        },
        { title: "", key: "actions", render: () => <div style={{ cursor: "pointer" }}>⋯</div> }
    ];

    return (
        <Layout className="dash-layout">

            {/* -------- HEADER -------- */}
            <Header className="dash-header">
                <img src={logosvg} className="dash-logo" />

                <div className="dash-search">
                    <input type="text" placeholder="Search for anything" className="dash-placeholder" />
                    <button><FiSearch color="#ffffff" size={18} /></button>
                </div>

                <div className="dash-right">
                    <u className="docs-link" style={{ color: '#213F7D' }}>Docs</u>
                    <IoMdNotificationsOutline size={26} color="#213F7D" />
                    <img src={avatar} className="profile-img" />
                    <span className="profile-name">{storedUser?.email?.split('@')[0] || '-'}</span>
                </div>
            </Header>

            <Layout>

                {/* -------- SIDEBAR -------- */}
                <Sider className="lendsqr-sider" width={283}>

                    <ul className="side-group">
                        <li className="side-item">
                            <FiBriefcase className="side-icon" />
                            <span>Switch Organization</span>
                            <FiChevronDown className="chevron-icon" />
                        </li>
                        <li
                            className={`side-item ${activeItem === "dashboard" ? "active" : ""}`}
                        >
                            <FaHome className="side-icon" />
                            <span>Dashboard</span>
                        </li>
                    </ul>

                    {/* ---- CUSTOMERS ---- */}
                    <p className="side-title">CUSTOMERS</p>
                    <ul className="side-group">
                        <li
                            className={`side-item ${activeItem === "users" ? "active" : ""}`}
                            onClick={() => {
                                setActiveItem("users");
                                navigate("/dashboard/users");
                            }}
                        >
                            <FiUsers className="side-icon" />
                            <span>Users</span>
                        </li>


                        <li className="side-item"><FiUserCheck className="side-icon" /><span>Guarantors</span></li>
                        <li className="side-item"><FiUploadCloud className="side-icon" /><span>Loans</span></li>
                        <li className="side-item"><FiSettings className="side-icon" /><span>Decision Models</span></li>
                        <li className="side-item"><FiDatabase className="side-icon" /><span>Savings</span></li>
                        <li className="side-item"><FiClipboard className="side-icon" /><span>Loan Requests</span></li>
                        <li className="side-item"><FiUserPlus className="side-icon" /><span>Whitelist</span></li>
                        <li className="side-item"><FiStar className="side-icon" /><span>Karma</span></li>
                    </ul>

                    {/* ---- BUSINESSES ---- */}
                    <p className="side-title">BUSINESSES</p>
                    <ul className="side-group">
                        <li className="side-item"><FiBriefcase className="side-icon" /><span>Organization</span></li>
                        <li className="side-item"><FiLayers className="side-icon" /><span>Loan Products</span></li>
                        <li className="side-item"><FiBox className="side-icon" /><span>Savings Products</span></li>
                        <li className="side-item"><FiDollarSign className="side-icon" /><span>Fees and Charges</span></li>
                        <li className="side-item"><FiRefreshCcw className="side-icon" /><span>Transactions</span></li>
                        <li className="side-item"><FiTool className="side-icon" /><span>Services</span></li>
                        <li className="side-item"><FiUser className="side-icon" /><span>Service Account</span></li>
                        <li className="side-item"><FiFileText className="side-icon" /><span>Settlements</span></li>
                        <li className="side-item"><FiBarChart2 className="side-icon" /><span>Reports</span></li>
                    </ul>

                    {/* ---- SETTINGS ---- */}
                    <p className="side-title">SETTINGS</p>
                    <ul className="side-group">
                        <li className="side-item"><FiSliders className="side-icon" /><span>Preferences</span></li>
                        <li className="side-item"><FiCreditCard className="side-icon" /><span>Fees and Pricing</span></li>
                        <li className="side-item"><FiArchive className="side-icon" /><span>Audit Logs</span></li>
                    </ul>
                    {showDetails && selectedUserId &&
                        <><hr style={{ opacity: '50%', color: '' }} /><ul className="side-group">
                            <li className="side-item"><LuLogOut className="side-icon" /><span>Logout</span></li>
                            <li className="side-item"><span>v1.2.0</span></li>
                        </ul></>
                    }


                </Sider>

                {/* -------- CONTENT -------- */}
                <Content className="dash-content">

                    {showDetails && selectedUserId ? (
                        <UserDetails
                            id={selectedUserId}
                            onBack={() => {
                                setShowDetails(false);
                                setSelectedUserId(null);
                            }}
                        />
                    ) : (
                        <>
                            <h2 className="page-title">Users</h2>
                            {/* ========== CARDS ========== */}
                            <div className="stats-card-container">

                                <div className="stats-card">
                                    <div className="icon-box purple"><img src={usericon} alt="userlogo" className="card-icon" /></div>
                                    <p className="label">USERS</p>
                                    <h1 className="value">2,453</h1>
                                </div>

                                <div className="stats-card">
                                    <div className="icon-box blue"><img src={activeuserslogo} alt="userlogo" className="card-icon" /></div>
                                    <p className="label">ACTIVE USERS</p>
                                    <h1 className="value">2,453</h1>
                                </div>

                                <div className="stats-card">
                                    <div className="icon-box orange"><img src={loanlogo} alt="userlogo" className="card-icon" /></div>
                                    <p className="label">USERS WITH LOANS</p>
                                    <h1 className="value">12,453</h1>
                                </div>

                                <div className="stats-card">
                                    <div className="icon-box red"><img src={savingslogo} alt="userlogo" className="card-icon" /></div>
                                    <p className="label">USERS WITH SAVINGS</p>
                                    <h1 className="value">102,453</h1>
                                </div>

                            </div>


                            <div className="users-table-wrapper">
                                <Table
                                    rowKey="id"
                                    loading={loading}
                                    columns={columns}
                                    dataSource={users}
                                    onRow={(record) => ({
                                        onClick: () => {
                                            setSelectedUserId(record?.id);
                                            setShowDetails(true);
                                        }
                                    })}
                                    pagination={{
                                        defaultPageSize: 10,
                                        showSizeChanger: true,
                                        pageSizeOptions: ["10", "20", "50", "100"],
                                        showTotal: (_, range) => `Showing ${range[1]} out of ${users?.length}`
                                    }}
                                />
                            </div>
                        </>
                    )}

                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
