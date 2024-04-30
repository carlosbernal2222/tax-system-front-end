
interface Form1099 {
    type: '1099';
    client: string;
    amount: string;
}

const Form1099Display: React.FC<{ form: Form1099 }> = ({ form }) => {
    return (
        <div>
            <strong>Client:</strong> {form.client}<br/>
            <strong>Amount Paid:</strong> {form.amount}<br/>
        </div>
    );
};

export default Form1099Display;