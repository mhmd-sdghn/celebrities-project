import { Alert, Autocomplete, Col, Grid, Paper, Select } from "@mantine/core";
import { useRouter } from "next/router";
import { AlertCircle } from "react-feather";
import MyCard from "../../components/elements/MyCard";
import CardSkeleton from "../../components/elements/MyCard/Skeleton";
import ResponseManager from "../../components/elements/ResponseManager";
import MainLayout from "../../components/layouts/main";
import useFetch from "../../hooks/useFetch";
import { Celebrities, Celebrity } from "../../types/Celebrities";

function Search() {
  const router = useRouter();

  const { data, isLoading, refetch, isError } = useFetch<Celebrities>(
    "/celebrities/search",
    undefined,
    ["q"]
  );

  const keywords =
    data && Array.isArray(data)
      ? data.map((el: Celebrity) => `${el.title} | ${el.face} | ${el.birthday}`)
      : [];

  function onSearch(text: string | undefined) {
    router.push(
      {
        pathname: "/celebrities",
        query: { ...router.query, q: text },
      },
      undefined,
      {}
    );

    let timer;

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      refetch();
    }, 500);
  }

  return (
    <MainLayout>
      <Grid gutter='xl'>
        <Col span={12}>
          <Autocomplete
            label='جستجو'
            onChange={onSearch}
            placeholder='حافظ شیرازی...'
            data={[]}
          />
        </Col>
        <Col span={12}>
          <ResponseManager.Wrapper
            isError={isError}
            isLoading={isLoading}
            noData={!data || (Array.isArray(data) && !data.length)}
          >
            <ResponseManager.Error>
              <Alert
                icon={<AlertCircle size={16} />}
                title='مشکلی در ارتباط با سرور پیش آمده'
                color='red'
              >
                متاسفانه در حال حاضر دریافت اطلاعات از سرور امکان پذیر نیست ،
                لطفا بعدا دوباره امتحان کنید
              </Alert>
            </ResponseManager.Error>
            <ResponseManager.Loading>
              <Grid>
                {Array.from("x".repeat(5)).map((_x, index) => (
                  <Col span={4} key={index}>
                    <CardSkeleton />
                  </Col>
                ))}
              </Grid>
            </ResponseManager.Loading>
            <ResponseManager.NoData>
              <Alert
                icon={<AlertCircle size={16} />}
                title='هیچی اینجا نیست!'
                color='red'
              >
                {router.query.q ? (
                  <span>
                    هیچ نتیجه‌ای برای جستجوی
                    <strong style={{ fontFamily: "1.5rem", margin: "0 5px" }}>
                      {router.query.q}
                    </strong>
                    یافت نشد
                  </span>
                ) : (
                  <span>هیچی اینجا نیست , سرور خالیه خالیه</span>
                )}
              </Alert>
            </ResponseManager.NoData>
            <ResponseManager.Data>
              <Grid>
                {!data || !Array.isArray(data) || isLoading
                  ? null
                  : data.map((item: Celebrity) => (
                      <Col span={4} key={item._id}>
                        <MyCard data={item} />
                      </Col>
                    ))}
              </Grid>
            </ResponseManager.Data>
          </ResponseManager.Wrapper>
        </Col>
      </Grid>
    </MainLayout>
  );
}

export default Search;
