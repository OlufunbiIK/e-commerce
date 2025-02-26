import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { OrderItem } from './entities/order-item.entity';

describe('OrderItemController', () => {
  let controller: OrderItemController;

  const mockOrderItemService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [
        {
          provide: OrderItemService,
          useValue: mockOrderItemService,
        },
      ],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with the correct data', async () => {
      const dto = {
        orderId: 1,
        productId: 1,
        quantity: 2,
        price: 200,
      };

      const createdItem = { ...dto, id: 1 };
      mockOrderItemService.create.mockResolvedValue(createdItem);

      const result = await controller.create(dto);

      expect(result).toEqual(createdItem);
      expect(mockOrderItemService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all order items', async () => {
      const items = [
        { id: 1, orderId: 1, productId: 1, quantity: 2, price: 200 },
        { id: 2, orderId: 2, productId: 2, quantity: 1, price: 150 },
      ];

      mockOrderItemService.findAll.mockResolvedValue(items);

      const result = await controller.findAll();

      expect(result).toEqual(items);
      expect(mockOrderItemService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order item by ID', async () => {
      const item = { id: 1, orderId: 1, productId: 1, quantity: 2, price: 200 };

      mockOrderItemService.findOne.mockResolvedValue(item);

      const result = await controller.findOne('1');

      expect(result).toEqual(item);
      expect(mockOrderItemService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an order item', async () => {
      const dto = { quantity: 3, price: 250 };
      const updatedItem = { id: 1, ...dto };

      mockOrderItemService.update.mockResolvedValue(updatedItem);

      const result = await controller.update('1', dto);

      expect(result).toEqual(updatedItem);
      expect(mockOrderItemService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove an order item by ID', async () => {
      const result = { affected: 1 };

      mockOrderItemService.remove.mockResolvedValue(result);

      const deleteResult = await controller.remove('1');

      expect(deleteResult).toEqual(result);
      expect(mockOrderItemService.remove).toHaveBeenCalledWith(1);
    });
  });
});
//
