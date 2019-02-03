export interface CopperPerson {
  id: number;
  name: string;
  prefix: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  address: CopperAddress;
  assignee_id: number;
  company_id: string;
  company_name: string;
  contact_type_id: number;
  details: string;
  emails: CopperEmail[];
  phone_numbers: CopperPhoneNumber[];
  title: string;
}

export interface CopperAddress {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface CopperEmail {
  email: string;
  category: string;
}

export interface CopperPhoneNumber {
  number: string;
  category: string;
}
