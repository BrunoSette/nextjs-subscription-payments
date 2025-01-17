'use client';

import FaqsList from './home/faqlist';
import Features from './home/features';
import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Subscription,
  Product,
  Price,
  BillingInterval,
  ProductWithPrices,
  PriceWithProduct,
  SubscriptionWithProduct
} from 'types';

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export default function Pricing({
  session,
  user,
  products,
  subscription
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/signin');
    }
    if (price.product_id === subscription?.prices?.products?.id) {
      return router.push('/account');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length)
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );

  if (products.length === 1)
    return (
      <>
        <section
          className="py-28"
          style={{
            background:
              'linear-gradient(152.92deg, rgba(240, 248, 255, 0.9) 0%, rgba(255, 255, 255, 1) 100%)'
          }}
        >
          <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
            <div className="max-w-xl space-y-3 md:mx-auto">
              <h3 className="text-cyan-600 font-semibold">Upgrade Your Job</h3>
              <p className="text-gray-800 text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                Welcome to Your AI Resume Optimizer
              </p>
              <p className="text-gray-600">
                Unleash Your Full Potential with Tailored AI Resume Optimization
              </p>
            </div>
            <div className="mt-4">
              <a
                href="#pricing"
                className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none"
              >
                Get started
              </a>
            </div>
          </div>
        </section>
        <section className="bg-black">
          <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                Pricing Plans
              </h1>
              <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
                Start building for free, then add a site plan to go live.
                Account plans unlock additional features.
              </p>
              <div className="relative flex self-center mt-12 border rounded-lg bg-zinc-900 border-zinc-800">
                <div className="border border-pink-500 border-opacity-50 divide-y rounded-lg shadow-sm bg-zinc-900 divide-zinc-600">
                  <div className="p-6 py-2 m-1 text-2xl font-medium text-white rounded-md shadow-sm border-zinc-800 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">
                    {products[0].name}
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
                {products[0].prices?.map((price) => {
                  const priceString =
                    price.unit_amount &&
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: price.currency!,
                      minimumFractionDigits: 0
                    }).format(price.unit_amount / 100);

                  return (
                    <div
                      key={price.interval}
                      className="divide-y rounded-lg shadow-sm divide-zinc-600 bg-zinc-900"
                    >
                      <div className="p-6">
                        <p>
                          <span className="text-5xl font-extrabold white">
                            {priceString}
                          </span>
                          <span className="text-base font-medium text-zinc-100">
                            /{price.interval}
                          </span>
                        </p>
                        <p className="mt-4 text-zinc-300">
                          {price.description}
                        </p>
                        <Button
                          variant="slim"
                          type="button"
                          disabled={false}
                          loading={priceIdLoading === price.id}
                          onClick={() => handleCheckout(price)}
                          className="block w-full py-2 mt-12 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900 "
                        >
                          {products[0].name ===
                          subscription?.prices?.products?.name
                            ? 'Manage'
                            : 'Subscribe'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </>
    );

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
          <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
            {intervals.includes('month') && (
              <button
                onClick={() => setBillingInterval('month')}
                type="button"
                className={`${
                  billingInterval === 'month'
                    ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes('year') && (
              <button
                onClick={() => setBillingInterval('year')}
                type="button"
                className={`${
                  billingInterval === 'year'
                    ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )}
          </div>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                  {
                    'border border-pink-500': subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === 'Freelancer'
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-zinc-300">{product.description}</p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-zinc-100">
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={!session}
                    loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                  >
                    {product.name === subscription?.prices?.products?.name
                      ? 'Manage'
                      : 'Subscribe'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
