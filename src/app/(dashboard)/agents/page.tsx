import React, { Suspense } from "react";
import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "./ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import AgentsListHeader from "@/modules/agents/ui/components/agents-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { loadSeachParams } from "./params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({searchParams}: Props) => {
  const filters = await loadSeachParams(searchParams)
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if(!session){
      redirect("/sign-in");
    }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
