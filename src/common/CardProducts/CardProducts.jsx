import { Card, Image, Text, Group, Badge, Center} from '@mantine/core';
import { IconFileDescription, IconClockHour2 } from '@tabler/icons-react';
import classes from './CardProducts.css?inline';
import { ExampleModal } from '../Modal/Modal';
import { useSelector } from 'react-redux';
import { userData } from '../../pages/userSlice';
import { useEffect, useState } from 'react';

export const FeaturesCard = ({ productId, product, type, description,duration, image, price, allProducts }) => {
  const rdxToken = useSelector(userData);
  const [modalShow, setModalShow] = useState (false);
  const mockdata = [
        { label: description, icon: IconFileDescription },
        { label: duration, icon: IconClockHour2 },    
      ];
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));
  const productValue = productId;
  const searchWorkers = allProducts.filter(product => product.product_id == productValue).map(value => ({ label: value.workerAppointment.users.name, value: value.id.toString() }));
    console.log(searchWorkers)
  useEffect (() => {
    if(!rdxToken.credentials == ""){
      setModalShow(true)
    }else {
      setModalShow(false)
    }
  }, [rdxToken])

  // console.log("soy el token",rdxToken)
  // console.log("soy el modal",setModalShow)
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={image} alt="Producto" />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{product}</Text>
          {/* <Text fz="xs" c="dimmed">{`Duración estimada: ${duration}`}</Text> */}
        </div>
        <Badge variant="outline">{type}</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Información
        </Text>

        <Group gap={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
             {`${price} €`}
            </Text>
          </div>

          <div>
           {rdxToken && modalShow && <ExampleModal allProducts={allProducts} productValue={productValue}/>} 
          </div>


        </Group>
      </Card.Section>
    </Card>
  );
}