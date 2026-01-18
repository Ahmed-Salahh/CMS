import dynamic from "next/dynamic";
import screensJSON from "../../../../screens.json";
import Loader from "@/components/loader";
import { Screen,ScreenHeader, ScreensJSON } from "@/types/screens";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
interface PageProps {
  params: Promise<{ screen_name: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const screen_name = (await params).screen_name;
 const user = await currentUser();
  const response = await fetch(
    `${process.env.API_URL}/reports/check_user_exists/${user?.emailAddresses[0].emailAddress}`
  );
  const responseData = await response.json();
  if (!responseData) {
    redirect("/standalone/welcome");
  }
  const screen: Screen | undefined = (screensJSON as ScreensJSON).screens.find(
    (screen) => screen.screen_name === screen_name
  );

  if (!screen) {
    throw new Error("Screen configuration not found");
  }

  // Dynamically import the screen header if it exists
  const DynamicScreenHeader = screen.screen_header
    ? (dynamic(
        () => import(`@/components/${screen.screen_header?.file_name}`),
        {
          loading: () => <Loader />,
        }
      ) as React.ComponentType<ScreenHeader>)
    : null;

  return (
    <>
      {screen.screen_header && DynamicScreenHeader && (
        <DynamicScreenHeader {...screen.screen_header} />
      )}
       <h1 className="text-2xl font-bold mb-4">{screen.screen_title}</h1>
      <div className="flex flex-col items-center gap-5">
        {screen.components?.map((component) => {
          const DynamicComponent = dynamic(
            () => import(`@/components/${component.file_name}`),
            { loading: () => <Loader /> }
          );

          return <DynamicComponent key={component.file_name} {...component} />;
        })}
      </div>
    </>
  );
};

export default Page;
