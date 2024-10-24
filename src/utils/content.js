import {
    UnorderedListOutlined,
    CreditCardOutlined,
    UserAddOutlined,
    FileUnknownOutlined,
    FileTextOutlined,
    UserOutlined, HeartOutlined
} from '@ant-design/icons';
export const basiDetailsTabItems = [
    {
        key: '1',
        label: 'Basic Info',

        icon: <FileUnknownOutlined />

    },
    {
        key: '2',
        label: 'Health Info',

        icon: <HeartOutlined />
    },
    {
        key: '3',
        label: 'Get Quote',

        icon: <UnorderedListOutlined />
    },

    // {
    //     key: '4',
    //     label: 'Choose Agent',

    //     icon: <UserOutlined />
    // },
    {
        key: '4',
        label: 'Document Upload',

        icon: <FileTextOutlined />
    },
    {
        key: '5',
        label: 'Add Nominee',

        icon: <UserAddOutlined />
    },
    {
        key: '6',
        label: 'Summary',

        icon: <FileTextOutlined />
    },
    {
        key: '7',
        label: 'Payment',

        icon: <CreditCardOutlined />
    },
];

export const fileUploadSteps = [
    {
        key: '1',
        title: 'Identification Proof',




    },
    {
        key: '2',
        title: 'Age Proof',



    },
    {
        key: '3',
        title: 'Address Proof',


    },
    {
        key: '4',
        title: 'FInancial Proof',


    }
];

export const QUOTES = [
    {
        id: 1,
        title: "Term Life Insurance",
        sumAssured: "$800K",
        term: "5 years",
        premium: "$85",
        frequency: "month"
    },
    {
        id: 2,
        title: "Term Life Insurance",
        sumAssured: "$500K",
        term: "5 years",
        premium: "$50",
        frequency: "month"
    },
    {
        id: 3,
        title: "Term Life Insurance",
        sumAssured: "$200K",
        term: "5 years",
        premium: "$20",
        frequency: "month"
    },
    {
        id: 4,
        title: "Term Life Insurance",
        sumAssured: "$100K",
        term: "5 years",
        premium: "$10",
        frequency: "month"
    }
]


export const basicInfoStepItems = [
    {
        key: '1',
        title: 'Covid19',




    },
    {
        key: '2',
        title: 'Surgery',



    },
    {
        key: '3',
        title: 'Narcotics',


    },
    {
        key: '4',
        title: 'Diabetes',


    },
    {
        key: '5',
        title: 'Occupation',


    },
    {
        key: '6',
        title: 'Travel',


    },

];

export const claimTrackerStages = [
    {
        key: "1",
        title: "",
        description: "Security Payment"
    },
    {
        key: "2",
        title: "",
        description: "Documents Uploaded"
    },
    {
        key: "3",
        title: "",
        description: "Claim Processing"
    },
    {
        key: "4",
        title: "",
        description: "Claim Approved"
    },
    {
        key: "5",
        title: "",
        description: "Payout deposited"
    }
]