import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { configService } from '../config/config.service'; // Import ConfigService
import { UserFactory } from './user.factory';
import { MainSeeder } from './main.seeder';

// Lấy cấu hình TypeORM từ ConfigService
const baseConfig: DataSourceOptions = configService.getDataSourceOptions();

// Kết hợp cấu hình cơ sở với SeederOptions
const options: DataSourceOptions & SeederOptions = {
  ...baseConfig,
  factories: [UserFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);

datasource
  .initialize()
  .then(async () => {
    console.log('Database initialized. Running seeders...');
    await datasource.synchronize(true); // Đồng bộ cơ sở dữ liệu (xóa sạch và tạo lại bảng)
    await runSeeders(datasource); // Chạy seeder
    console.log('Seeding completed.');
    process.exit(); // Thoát sau khi hoàn thành
  })
  .catch((error) => {
    console.error('Error during data source initialization or seeding:', error);
    process.exit(1); // Thoát với mã lỗi
  });
