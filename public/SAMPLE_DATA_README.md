# Sample Claims Data for Testing

This directory contains sample data files that you can use to test the Bulk Claims Submission feature of the Insurance Exchange Demo.

## Available Sample Files

### 1. `sample-claims.csv` (20 claims)
- **Format**: Comma-separated values (CSV)
- **Size**: ~2.5 KB
- **Claims**: 20 realistic insurance claims
- **Types**: Auto Collision, Property Damage, Medical, Auto Theft

### 2. `sample-claims.json` (10 claims)
- **Format**: JavaScript Object Notation (JSON)
- **Size**: ~4.5 KB
- **Claims**: 10 claims with structured data
- **Features**: Includes metadata and claim type breakdowns

## How to Use

1. **Download the files** from the public directory
2. **Upload them** using the Bulk Claims Submission interface
3. **Review the preview** to see how claims are parsed
4. **Submit the claims** to test the complete workflow

## Data Fields Included

Each claim contains the following information:

- **ClaimID**: Unique identifier for the claim
- **PolicyholderName**: Full name of the policyholder
- **PolicyNumber**: Insurance policy number
- **ClaimType**: Type of insurance claim
- **ClaimAmount**: Dollar amount of the claim
- **IncidentDate**: Date when the incident occurred
- **Description**: Detailed description of the incident
- **PolicyholderEmail**: Contact email address
- **PhoneNumber**: Contact phone number
- **Address**: Policyholder's address
- **VehicleInfo**: Vehicle details (for auto claims)
- **PropertyInfo**: Property details (for property claims)

## Claim Types Represented

- **Auto Collision**: Various types of vehicle accidents
- **Property Damage**: Fire, water, storm, and vandalism damage
- **Medical**: Emergency care, surgery, and therapy
- **Auto Theft**: Vehicle theft incidents

## Testing Scenarios

Use these files to test:

1. **File Upload**: Different file formats and sizes
2. **Data Parsing**: How the system handles various claim types
3. **Validation**: Required field checking and data format validation
4. **Bulk Processing**: Submitting multiple claims at once
5. **Error Handling**: How the system responds to invalid data

## Customization

Feel free to modify these files to test specific scenarios:

- Add invalid data to test validation
- Change claim amounts to test different ranges
- Modify dates to test time-based logic
- Add new claim types to test extensibility

## Notes

- All data is fictional and for demonstration purposes only
- Phone numbers and email addresses are fake
- Addresses are generic and not real locations
- VIN numbers are example formats, not real vehicle identifiers

## Support

If you encounter issues with the sample data or need help creating custom test files, refer to the main application documentation or contact the development team.
