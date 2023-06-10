import Stripe from 'stripe';
import { Database } from './types_db';

export interface PageMeta {
  title: string;
  description: string;
  cardImage: string;
}

export interface Customer {
  id: string /* primary key */;
  stripe_customer_id?: string;
}

export interface Product {
  id: string /* primary key */;
  active?: boolean;
  name?: Database['public']['Enums']['product_name'];
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface UserDetails {
  id: string /* primary key */;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  resume_created_count?: number;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Price {
  id: string /* primary key */;
  product_id?: string /* foreign key to products.id */;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface PriceWithProduct extends Price { }

export interface Subscription {
  id: string /* primary key */;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string /* foreign key to prices.id */;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}

export interface ResumeCreationBody {
  oldResume: string;
  jobPost: string;
}

export interface ApiStepResponse {
  data: string;
}

export interface ApiError {
  status: number;
  error?: object;
  message: string;
}

export interface ValidationError {
  location: string;
  error?: object | string;
  message?: string;
}



export interface JSONResume {
  firstStep: { profile: string[] };
  secondStep: { experiences: IResumeWorkExperiences[] };
  thirdStep: { education: IResumeEducation[] };
  fourthStep: { additional_information: IResumeAdditionalInformation };
}

export interface IResumeAdditionalInformation {
  certifications: ICertificationAndVolunteer[];
  volunteer: ICertificationAndVolunteer[];
}

export class CertAndVolunteer {
  constructor(
    public name: string = '',
    public issuer: string = '',
    public year: string = '',
  ) { }
}

export interface ICertificationAndVolunteer extends CertAndVolunteer { };

export type certAndVolunteerPropsArrayType = Array<keyof ICertificationAndVolunteer>;

export const certAndVolunteerPropsArray: certAndVolunteerPropsArrayType =
  Object.keys(new CertAndVolunteer()) as certAndVolunteerPropsArrayType;



export interface ApiJSONResumeResponse {
  data: JSONResume;
}

export class WorkExp {
  constructor(
    public date_in: string = '',
    public date_out: string = '',
    public city: string = '',
    public company: string = '',
    public role: string = '',
    public achievements: string[] = [],
  ) { }
}

export interface IResumeWorkExperiences extends WorkExp { }

export type WorkExpPropsArrayType = Array<keyof IResumeWorkExperiences>;

export const workExpPropsArray: WorkExpPropsArrayType =
  Object.keys(new WorkExp()) as WorkExpPropsArrayType;

export class Educ {
  constructor(
    public course: string = '',
    public institution: string = '',
    public city: string = '',
    public region: string = '',
    public country: string = '',
    public year: string = '',
    public degree: string = '',
  ) { }
}

export interface IResumeEducation extends Educ { }

export type EducPropsArrayType = Array<keyof IResumeEducation>;

export const educPropsArray: EducPropsArrayType =
  Object.keys(new Educ()) as EducPropsArrayType;


export interface IPersonalInfo {
  fName: string;
  lName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  website: string;
  country: string;
  city: string;
  region: string;
  postalcode: string;
}

export interface IJobPost {
  jobPost: string;
}

export type StepStatus = 'current' | 'upcoming' | 'complete';
