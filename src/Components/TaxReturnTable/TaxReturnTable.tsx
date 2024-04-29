import React from 'react';
import { Table, Button } from '@trussworks/react-uswds';

interface TaxReturn {
    id: number;
    year: number;
    filingStatus: string;
    amount: number;
}

interface TaxReturnTableProps {
    taxReturns: TaxReturn[];
}




const TaxReturnTable: React.FC<TaxReturnTableProps> = ({ taxReturns }) => {
    return (
        <Table striped fullWidth className="bg-primary-lighter">
             <thead>
                <tr>
                    <th>ID</th>
                    <th>Year</th>
                    <th>Filing Status</th>
                    <th>Amount</th>
                    <th>Actions</th> {/* New column for buttons */}
                </tr>
            </thead>
            <tbody>
                {taxReturns.map((taxReturn) => (
                    <tr key={taxReturn.id}>
                        <td>{taxReturn.id}</td>
                        <td>{taxReturn.year}</td>
                        <td>{taxReturn.filingStatus}</td>
                        <td>${taxReturn.amount.toLocaleString()}</td>
<td>
                            {taxReturn.filingStatus === 'In Progress' && (
                                <Button 
                                    type="button" 
                                    onClick={() => console.log('Continue Tax Filing', taxReturn.id)}
                                    outline={false}
                                >
                                    Continue
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
            
        </Table>
    );
};

export default TaxReturnTable;