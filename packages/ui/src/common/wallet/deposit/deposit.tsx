import { useTranslations } from "next-intl";
import AlertBlock from "../shared/alert-block";
import AddressSection from "./address-section";
import ChooseNetworkDialog from "./choose-network-dialog";
import QRCode from "./qr-code";
import GoToExplorerBtn from "./go-to-explorer-btn";

const Deposit = () => {
  const t = useTranslations("depositPage");
  return (
    <div className="space-y-6">
      <ChooseNetworkDialog />
      <AddressSection />
      <QRCode />
      <AlertBlock>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-semibold text-primary">
              {t("supportToken")}
            </p>
            <ul className="list-none space-y-2 pl-5">
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                <span className="text-[16px]">NEAR (native)</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                <a
                  href="https://nearblocks.io/token/usdt.tether-token.near"
                  target="_blank"
                  className="text-[16px] text-blue-600 hover:underline"
                  rel="noreferrer"
                >
                  USDT
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                <a
                  href="https://nearblocks.io/token/17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1"
                  target="_blank"
                  className="text-[16px] text-blue-600 hover:underline"
                  rel="noreferrer"
                >
                  USDC
                </a>
              </li>
            </ul>
          </div>
          <p className="font-medium text-primary">
            {t("otherTokenNotSupport")}
          </p>
        </div>
        <div className="mt-3 rounded-r-xl border-yellow-500 border-l-4 bg-yellow-100 p-4">
          <p className="text-yellow-700">
            <span className="font-bold">{t("caution")}</span>{" "}
            {t("alwaysDoubleCheck")}
          </p>
        </div>
      </AlertBlock>
      <GoToExplorerBtn />
    </div>
  );
};

export default Deposit;
